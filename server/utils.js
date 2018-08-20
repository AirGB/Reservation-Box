const parseBookedDates = (data) => {
  console.log('IN UTILS DATA', data);
  const result = {
    checkIn: new Date(data.checkIn).toString().slice(0,9),
    checkOut: new Date(data.checkOut).toString().slice(0,9)
  };
  console.log('IN UTILS RESULT', result, data.checkIn, data.checkOut);
  return result;
};

module.exports = {
  parseBookedDates,
};
