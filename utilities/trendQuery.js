const googleTrends = require('google-trends-api');
const backDateByMonths = require('./backDate');
const sanitizeTrend = require('./sanitizeTrend');

module.exports = (keyword, callback) => {
  const options = {
    keyword: keyword,
    startTime: backDateByMonths(15),
    endTime: new Date()
  };

  googleTrends.interestOverTime(options)
    .then(results => {
      callback(null, sanitizeTrend(results));
    })
    .catch(err => {
      callback(err, null);
    });
};


