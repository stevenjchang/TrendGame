const queryTrend = require('./trendQuery.js');
const findPeaks = require('./peakAlgo.js');
const getNews = require('./aylienApi');
const makeFinalData = require('./stitchData');

const makeTimeline = (trend, startTime, endTime, callback) => {
  queryTrend(trend, startTime, endTime, (err, timeSeries) => {
    if (err) {
      console.log(err)
      callback(err, null);

    } else {
      const peaks = findPeaks(timeSeries);
      getNews(trend, peaks, 'title', (err, peakStories) => {
        if (err) {
          callback(err, null);

        } else if (peakStories[0].stories[0] === undefined) {
          getNews(trend, peaks, 'body', (err, peakStories) => {

            if (err) {
              callback(err, null);
            } else {
              const response = makeFinalData(timeSeries, peakStories, trend);
              callback(null, response);
            }
          });

        } else {
          const response = makeFinalData(timeSeries, peakStories, trend);
          callback(null, response);
        }
      });
    }
  });
};

module.exports = makeTimeline;
