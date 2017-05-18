const aylienApi = require('./aylienApi');
// const makeFinalData = require('./stitchData');

const makeArticles = (trend, date, callback) => {
  aylienApi.getStoriesForOneDay(trend, date, 'title', (err, peakStories) => {
    if (err) {
      callback(err, null);

    } else if (peakStories[0].stories[0] === undefined) {
      aylienApi.getStoriesForOneDay(trend, date, 'body', (err, peakStories) => {

        if (err) {
          callback(err, null);
        } else {
          // const response = peakStories;
          callback(null, peakStories);
        }
      });

    } else {
      // const response = makeFinalArticleData(timeSeries, peakStories, trend);
      callback(null, peakStories);
    }
  });
};

module.exports = makeArticles;