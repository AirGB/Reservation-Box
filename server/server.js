require('newrelic');
const express = require('express');
const path = require('path');
const db = require('../dockerdb/db/db.js');
const utils = require('./utils.js');
const PORT = process.env.PORT || 3003;
const redis = require('redis');

const app = express();
const client = redis.createClient(6379, '54.185.59.221');
// port open on ec2 instance, ec2 istance ip address

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => console.log('Listening at port: ' + PORT));


app.get('/api/listings/:listingId', (req, res) => {

  client.get(req.params.listingId, (error, result) => {
    if (result) {
      res.send(result)
    } else {
      db.getListingById(req.params, (err, result) => {
        // console.log(req.params, 'listing ID server')
        if (err) {
          res.status(500).send({ err: `Server oopsie ${err}` });
        } else if (result.length === 0) {
          res.status(404).send('No such listing')
        } else {
          // console.log('getReviewsByListingId input', result.rows[0].review_id)
          db.getReviewsByListingId(result.rows[0].review_id, (err, reviews) => {
            if (err) {
              res.status(500).send({err: `Server oopsie ${err}`})
            } else {
              // let returnReviews = reviews.rows[0];
              // console.log('REVIEWS', returnReviews);
              result.rows[0].reviews = reviews.rows[0];
              // console.log('ABOUT TO SEND:', result.rows[0]);
              client.setex(req.params.listingId, 180, result.rows[0]);
              res.send(result.rows[0]);
            }
          })
        }
      });
    }
  });

});


app.get('/api/listings2/:listingId', (req, res) => {
  let key = req.params.listingId;
  client.get(key, (error, result) => {
    if(result) {
      res.status(200).send(result);
    } else {
      db.getListingById(req.params, (err, data) => {
        if(err) {
          res.status(500).send(`ERROR IN GET REQUEST, ${err}`)
        } else {
          client.setex(key, 180, JSON.stringify(data.rows));
          res.status(200).send(data.rows);
        }
      })
    }
  })
})

app.get('/api/dates/:listingId', (req, res) => {
  // TODO: refactor using router
  let method = db.getBookedDatesByListingId;
  let data = null; 
  let key = null;

  if (req.query.targetDate) {
    method = db.getFirstBookedDateAfterTarget;
    let target = req.query.targetDate.split('-');
    data = [req.params.listingId, ...target];
    key = 'targetDate-'+req.params.listingId;
  }

  if (req.query.month) {
    let month = req.query.month.split('-');
    data = [req.params.listingId, ...month];
    key = 'month-'+req.params.listingId;
  }
  
  // console.log('key', key, typeof key, 'data', data, 'method', method)
  client.get(key, (error, response) => {
    if(response) {
      res.send(response);
    } else {
      method(data, (err, result) => {
        if (err) {
          res.status(500).send({ err: `Server oopsie ${err}` });
        } else {
          client.setex(key, 180, result.rows)
          res.status(200).send(result.rows);
        }
      });   
    }
  })
});

app.post('/api/reservations/new', (req, res) => {
  // TODO: find more elegant implementation that ensures atomicity
  // const data = utils.parseBookedDates(req.body);
  db.postNewBookedDates(req.body, (err, result) => {
    if (err) {
      res.status(500).send({ err: 'Failed to post dates' });
    } else {
      req.body.bookedDatesId = result.rows[0].id;
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



