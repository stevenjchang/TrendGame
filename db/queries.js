var db = require('./config');
const findUnique = require('../utilities/findUnique');


const addUser = (googleID, callback) => {
  db('users').insert({googleID: googleID})
    .then(response => {
      callback(null, response);
    })
    .catch(error => {
      callback(error, null);
    });
}
const insertSearch = (searchString, callback) => {
  db('trends').insert({name: searchString}).then((resp) => {
    callback(null, resp);
  }).catch((err) => {
    callback(err, null);
  });
};

const getSearches = (numberOfSearches, callback) => {
  db.select('name').from('trends').then((data) => {
    let dataNoDups = findUnique(data);
    let dataSlice = dataNoDups.slice(0, numberOfSearches);
    let dataClean = dataSlice.map((search) => {
      return search.name;
    });
    callback(null, dataClean);
  }).catch((err) => {
    callback(err, null);
  });
};

// get User's saved trends

// save User's favorited trends

module.exports.insertSearch = insertSearch;
module.exports.getSearches = getSearches;
module.exports.addUser = addUser;
