const aylienApi = require('./aylienApi');
const AYLIENTextAPI = require('aylien_textapi');

var textapi = new AYLIENTextAPI({
  application_id: process.env.AYLIEN_TEXT_ID,
  application_key: process.env.AYLIEN_TEXT_KEY
});
// textapi.sentiment({'text': 'John is a very good football player!'}, function(error, response) {
//   if (error === null) {
//     console.log(response);
//   }
// });
// const makeFinalData = require('./stitchData');

const getSentiment = (array, done) => {
  if(array.length === 0) {
    console.log("Finished!")
    done();
    return;
  }
  if(array[0].summary) {
    textapi.sentiment({'text': array[0].summary}, function(error, response){
      if(error === null) {
        array[0].sentiment = response;
        array.shift()
        return getSentiment(array, done);
      } else {
        console.log(error);
      }
    })
  } else {
    array.shift()
    return getSentiment(array, done);
  }
}

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
          let theStories = peakStories[0].stories;
          callback(null, peakStories);
        }
      });

    } else {
      let theStories = peakStories[0].stories.slice();
      getSentiment(theStories, () => {
        console.log(peakStories[0].stories[0]);
        callback(null, peakStories);
      })
      // const response = makeFinalArticleData(timeSeries, peakStories, trend);
    }
  });
};

module.exports = makeArticles;