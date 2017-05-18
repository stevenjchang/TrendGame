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
      console.log('response from scotts app: ', response.data);
      callback(null, sanitizeTrend(response.data))
    })
    .catch(error => {
      console.log('you got and error from scotts app: ', error)
      callback(error, null);
    })

};
