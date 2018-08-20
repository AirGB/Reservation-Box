require('newrelic');
const express = require('express');
const path = require('path');
const db = require('../db/db.js');
const utils = require('./utils.js');
const PORT = process.env.PORT || 3003;

const app = express();

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => console.log('Listening at port: ' + PORT));


app.get('/api/listings/:listingId', (req, res) => {

  db.getListingById(req.params, (err, result) => {
    console.log(req.params, 'listing ID server')
    if (err) {
      res.status(500).send({ err: `Server oopsie ${err}` });
    } else if (result.length === 0) {
      res.status(404).send('No such listing')
    } else {
      console.log('getReviewsByListingId input', result.rows[0].review_id)
      db.getReviewsByListingId(result.rows[0].review_id, (err, reviews) => {
        if (err) {
          res.status(500).send({err: `Server oopsie ${err}`})
        } else {
          // let returnReviews = reviews.rows[0];
          // console.log('REVIEWS', returnReviews);
          result.rows[0].reviews = reviews.rows[0];
          console.log('ABOUT TO SEND:', result.rows[0]);
          res.send(result.rows[0]);
        }
      })
    }
  });

});

// getListingBookedDatesByMonth() {
//     let [year, month] = utils.getYearMonth(this.state.dateInView);
//     let url = `/api/dates/${this.props.listingId}?month=${year}-${month+1}`;

// getFirstUnavailableDateAfterCheckIn() {
//     //TODO: work out bug - can't determine firstUnavailable if next upcoming reservation starts in the next month 
//     let context = this;

//     let [year, month, date] = utils.getYearMonthDate(this.props.checkInDate);
//     let url = `/api/dates/${this.props.listingId}?targetDate=${year}-${month+1}-${date}`;

app.get('/api/dates/:listingId', (req, res) => {
  // TODO: refactor using router
  let method = db.getBookedDatesByListingId;
  let data = null; 

  if (req.query.targetDate) {
    method = db.getFirstBookedDateAfterTarget;
    let target = req.query.targetDate.split('-');
    data = [req.params.listingId, ...target];
  }

  if (req.query.month) {
    let month = req.query.month.split('-');
    data = [req.params.listingId, ...month];
  }

  method(data, (err, result) => {
    console.log('GET DATES RETURN', err, result.rows)
    if (err) {
      res.status(500).send({ err: `Server oopsie ${err}` });
    } else {
      res.send(result.rows);
    }
  });

});

// postNewReservation () {
//     let url ='/api/reservations/new' + this.props.listingId;

app.post('/api/reservations/new', (req, res) => {
  // TODO: find more elegant implementation that ensures atomicity
  console.log('REQUEST', req.body);
  // const data = utils.parseBookedDates(req.body);
  db.postNewBookedDates(req.body, (err, result) => {
    if (err) {
      console.log('ERROR', err);
      res.status(500).send({ err: 'Failed to post dates' });
    } else {
      console.log('SUCCESS', result);
      req.body.bookedDatesId = result.rows[0].id;
      console.log("GOING TO MAKE ANOTHER REQUEST", req.body);
      db.postNewReservation(req.body, (error, reservation) => {
        if (error) {
          console.log('STILL BROKEN');
          db.deleteBookedDatesById(req.body, (erroror, deleted) => {
            if(erroror) {
              console.log('FAILED TO DELETE FAILED BOOKED DATE', err)
            } else {
              res.status(500).send('Failed to post reservation, but deleted booked dates', err);
            }
          });
        } else res.status(201).send(reservation);
      });
    }
  });

});

app.put('/api/reservations/:reservation_id/change_total_charge/:new_total_charge', (req, res) => {
  db.putNewCharge(req.params.reservation_id, req.params.new_total_charge, (err, result) => {
    if(err) {
      console.log('ERROR CHANGING CHARGE', err);
      res.status(500).send('There was an error, could not change charge', err);
    } else {
      res.status(200).send(result);
    }
  });
});

app.delete('/api/reservation/:reservationId/remove', (req, res) => {
  db.deleteReservation(req.params.reservationId, (err, result) => {
    if(err) {
      console.log('ERROR deleting reservation', err);
      res.status(500).send('There was an error when deleting the reservation', err);
    } else {
      res.status(200).send(result)
    }
  })
})



