// const mysql = require('mysql');
const pg = require('pg');

// const port = process.env.RDS_PORT|| 3306;
// const host = process.env.RDS_HOSTNAME || 'localhost';

const connectionStr = "postgres://reservation_user@ec2-52-11-72-25.us-west-2.compute.amazonaws.com:5432/reservation";
// const connectionStr = "postgres://localhost/reservation";

var db = new pg.Client(connectionStr);
db.connect();

// const db = mysql.createConnection({
//   host: process.env.RDS_HOSTNAME || 'localhost',
//   user: process.env.RDS_USERNAME || 'root',
//   password: process.env.RDS_PASSWORD || '',
//   port: process.env.RDS_PORT|| 3306,
//   database: 'reservation'
// });

const getListingById = ({listingId}, callback) => {
  const queryStr = `SELECT * from listings WHERE id = ${listingId};`;
  db.query(queryStr, (err, data) => {
    if(err) {
      callback(err);
      return
    }
    callback(null, data);
  });
};

const getReviewsByListingId = (listingId, callback) => {
  const queryStr = `SELECT * from reviews WHERE id = ${listingId}`;
  db.query(queryStr, (err, data) => {
    if(err) {
      callback(err);
      return;
    }
    callback(null, data);
  });
};

const getBookedDatesByListingId = ([listingId, year, month], callback) => {
  let startDate = [year, month, 1].join('-');
  let endDate = month === '12'? [Number(year)+1, 1, 1].join('-'): [year, Number(month)+1, 1].join('-');
  const queryStr = `SELECT check_in, check_out FROM booked_dates WHERE listing_id = ${listingId} AND check_in >= '${startDate}' AND check_in < '${endDate}' ORDER BY check_in`;
    // [listingId, startDate, endDate], callback
  db.query(queryStr, (err, data) => {
    if(err) {
      callback(err);
      return;
    }
    callback(null, data);
  });
};

const getFirstBookedDateAfterTarget = ([listingId, year, month, date], callback) => {
  let startDate = [year, month, date].join('-');
  let endDate = month === '12' ? [Number(year)+1, 1, 1].join('-') : [year, Number(month)+1, 1].join('-');
  const queryStr = `SELECT check_in FROM booked_dates WHERE listing_id = ${listingId} AND check_in > '${startDate}' AND check_in < '${endDate}' ORDER BY check_in ASC LIMIT 1`;
    // [listingId, startDate, endDate], callback
  db.query(queryStr, (err, data) => {
    if(err) {
      callback(err);
      return
    }
    callback(null, data);
  })
}

const postNewBookedDates = (data, callback) => {
  const queryStr = `INSERT INTO booked_dates (listing_id, check_in, check_out) VALUES (${data.listingId}, '${data.checkIn}', '${data.checkOut}') RETURNING id`;
  db.query(queryStr, (err, returnData) => {
    if(err) {
      callback(err);
      return;
    }
    callback(null, returnData);
  });
}

const postNewReservation = (data, callback) => {
  const queryStr = `INSERT INTO reservations (guest_id, booked_dates_id, total_adults, total_pups, total_charge, created_at) VALUES (${data.guestId}, ${data.bookedDatesId}, ${data.adults}, ${data.pups}, ${data.charge}, DEFAULT)`;
  db.query(queryStr, (err, resData) => {
    if(err) {
      callback(err);
      return
    }
    callback(null, resData);
  });
};

const deleteBookedDatesById = (data, callback) => {
  const queryStr = `DELETE FROM booked_dates WHERE id = ${data.bookedDatesId}`;
  db.query(queryStr, (err, response) => {
    if(err) {
      callback(err);
      return;
    }
    callback(null, response);
  });
};

const putNewCharge = (id, newCharge, callback) => {
  db.query(`UPDATE reservations SET total_charge = ${newCharge} WHERE id = ${id};`, (err, data) => {
    if(err) {
      callback(err);
      return;
    }
    callback(null, data);
  });
}

const deleteReservation = (id, callback) => {
  db.query(`DELETE FROM reservations WHERE id = ${id};`, (err, data) => {
    if(err) {
      callback(err);
      return;
    }
    callback(null, data);
  });
}


module.exports = {
  getListingById,
  getReviewsByListingId,
  getBookedDatesByListingId,
  getFirstBookedDateAfterTarget,
  postNewBookedDates,
  postNewReservation,
  deleteBookedDatesById,
  putNewCharge,
  deleteReservation,
};
