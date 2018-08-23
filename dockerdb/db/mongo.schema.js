const mongoose = require('mongoose');

// fill in later
// mongoose.connect()



const listings = new mongoose.Schema({
  id: Number,
  property_name: String,
  host_id: Number,
  host_username: String,
  total_reviews: Number,
  avg_review_rating: Number,
  weekly_views: Number,
  min_stay: Number,
  max_guests: Number,
  fees: Number,
  tax_rate: Number,
  rate: Number,
  reservations: [reservationIds (_id)]
});

const reservations = new mongoose.Schema({
  _id: //unique key id
  guest_id:
  guest_username:
  check_in:
  check_out:
  total_adults:
  total_pups:
  total_charge:
});


// // listings
// {
//   _id: {
//     type:
//     val:
//   }//unique key id
  
//   listing: {
//     property_name: //text
//     host: {
//       id:
//       username:
//     }
//     total_reviews:
//     avg_review_rating:
//     weekly_views:
//     min_stay:
//     max_guests:
//     fees:
//     tax_rate:
//     rate: 
//   }
//   reservations: [
//     {},
//     {},
//     {}
//   ]
// }
// // reservations


// need to figure out how to make hosts and users

// nested schema. Comes before the parent schema