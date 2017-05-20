// const googleTrends = require('google-trends-api');
const backDateByMonths = require('./backDate');
const sanitizeTrend = require('./sanitizeTrend');
const axios = require('axios');

module.exports = (trend, startTime, endTime, callback) => {
  startTime = startTime || backDateByMonths(15);
  endTime = endTime || new Date();


  // const options = {
  //   keyword: query.q,
  //   // startTime: startTime
  // };

  // google trends down!!

  // googleTrends.interestOverTime(options)
  //   .then(results => {
  //     callback(null, sanitizeTrend(results));
  //   })
  //   .catch(err => {
  //     console.log('google trends error: ', err)
  //     callback(err, null);
  //   });

  axios.get('http://dumbgoogletrends.herokuapp.com/', {
    params: {
      keyword: trend, 
      startTime: startTime,
      endTime: endTime
    }
  })
    .then(response => {
      callback(null, sanitizeTrend(response.data))
    })
    .catch(error => {
      callback(error, null);
    })

};

