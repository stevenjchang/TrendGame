const AylienNewsApi = require('aylien-news-api');
const epoch = require('epoch.js');

const formatStories = require('./aylienApiDataFormatter');

exports.getNews = (queryString, peaks, scope, callback) => {

  // Format date query for API
  // 604800000 is 1 week in milliseconds
  const peakDate = new Date(peaks[0][0] * 1000);
  const peakEndDate = new Date(peaks[0][0] * 1000 + 604800000);
  let formattedPeakDate = epoch(peakDate).format('YYYY[-]MM[-]DD[T]hh[:]mm[:]ss[Z]');
  let formattedPeakEndDate = epoch(peakEndDate).format('YYYY[-]MM[-]DD[T]hh[:]mm[:]ss[Z]');

  // Establish API instance and supply credentials
  const apiInstance = new AylienNewsApi.DefaultApi();

  console.log('WARNING!')

  let appId = apiInstance.apiClient.authentications['app_id'];
  appId.apiKey = process.env.AYLIEN_ID;
 
  let appKey = apiInstance.apiClient.authentications['app_key'];
  appKey.apiKey = process.env.AYLIEN_KEY;


  // Assign options for API query
  let opts = {
    'sortBy': 'source.links_in_count',
    'language': ['en'],
    'publishedAtStart': formattedPeakDate,
    'publishedAtEnd': formattedPeakEndDate,
    'perPage': 10
  };

  opts[scope] = queryString;

  apiInstance.listStories(opts, (error, data, response) => {
    if (error) {
      console.log('ERROR: ', error)
      callback(error, null);
    } else {
      const formattedStories = formatStories(data);
      let finalData = [];
      finalData.push({
        date: peaks[0][0],
        stories: formattedStories
      });

      callback(null, finalData);
    }
  });
};

exports.getStoriesForOneDay = (queryString, date, scope, callback) => {
  const peakDate = new Date(date);
  const peakEndDate = new Date(date);
  peakEndDate.setDate(peakEndDate.getDate() + 1);
  let formattedPeakDate = epoch(peakDate).format('YYYY[-]MM[-]DD[T]hh[:]mm[:]ss[Z]');
  let formattedPeakEndDate = epoch(peakEndDate).format('YYYY[-]MM[-]DD[T]hh[:]mm[:]ss[Z]');
  // Establish API instance and supply credentials
  const apiInstance = new AylienNewsApi.DefaultApi();

  console.log('WARNING!')

  let appId = apiInstance.apiClient.authentications['app_id'];
  appId.apiKey = process.env.AYLIEN_ID;
 
  let appKey = apiInstance.apiClient.authentications['app_key'];
  appKey.apiKey = process.env.AYLIEN_KEY;


  // Assign options for API query
  let opts = {
    'sortBy': 'source.links_in_count',
    'language': ['en'],
    'publishedAtStart': formattedPeakDate,
    'publishedAtEnd': formattedPeakEndDate,
    'perPage': 10
  };

  opts[scope] = queryString;

  apiInstance.listStories(opts, (error, data, response) => {
    if (error) {
      console.log('ERROR: ', error)
      callback(error, null);
    } else {
      const formattedStories = formatStories(data);
      let finalData = [];
      finalData.push({
        stories: formattedStories
      });

      callback(null, finalData);
    }
  });
}
