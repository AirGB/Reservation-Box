var fs = require('fs');
var faker = require('faker');
var readline = require('linebyline');

const randomNumberGen = (min, max) => {
  return min + Math.round(Math.random() * (max - min));
}

const appendLeading = (val) => {
  if(val < 10) {
    return `0${val}`;
  } else {
    return `${val}`
  }
}

const generateDates = () => {
  var arr = [];
  var year = randomNumberGen(2018, 2020);
  var month = randomNumberGen(1,12);
  var day = randomNumberGen(1,18);
  var day2 = day + randomNumberGen(3,10);

  var date1 = `${year}-${appendLeading(month)}-${appendLeading(day)}`;
  var date2 = `${year}-${appendLeading(month)}-${appendLeading(day2)}`;

  arr.push(date1, date2);

  return arr;
}

const generateDate = () => {
  var year = randomNumberGen(2018, 2020);
  var month = randomNumberGen(1,12);
  var day = randomNumberGen(1,28);
  return `${year}-${appendLeading(month)}-${appendLeading(day)}`;
}

const generateMonth = () => {
  var year = randomNumberGen(2018, 2020);
  var month = randomNumberGen(1,12);
  return `${year}-${appendLeading(month)}`;
}

const generateListingIds = () => {
  console.log('generateListingIds');
  let out = fs.createWriteStream('./listingIdsData.csv');
  out.write(`listingIds, targetDate, targetMonth, reservationId, newCharge, deleteReservation, checkIn, checkOut, guestId, adults, pups, charge\n`, 'utf-8')
  for(var i = 1; i < 1000; i++) {
    let dates = generateDates();
    out.write(`${randomNumberGen(1, 9000000)}, ${generateDate()}, ${generateMonth()}, ${randomNumberGen(1, 27000000)}, ${randomNumberGen(100, 200)}, ${randomNumberGen(1, 27000000)}, ${dates[0]}, ${dates[1]}, ${randomNumberGen(1, 9000000)}, ${randomNumberGen(1, 6)}, ${randomNumberGen(1, 6)}, ${randomNumberGen(70, 250)}\n`, 'utf-8')
  }
  for(var j = 1; j < 9000; j++) {
    let dates = generateDates();
    out.write(`${randomNumberGen(9000001, 10000000)}, ${generateDate()}, ${generateMonth()}, ${randomNumberGen(27000001, 30000000)}, ${randomNumberGen(100, 200)}, ${randomNumberGen(27000001, 30000000)}, ${dates[0]}, ${dates[1]}, ${randomNumberGen(9000001, 10000000)}, ${randomNumberGen(1, 6)}, ${randomNumberGen(1, 6)}, ${randomNumberGen(70, 250)}\n`, 'utf-8')
  }
  out.end();
}

generateListingIds();
