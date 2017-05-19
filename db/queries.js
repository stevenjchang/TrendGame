var db = require('./config');
const findUnique = require('../utilities/findUnique');

const findUser = (googleID, callback) => {
  db('users').where('googleID', googleID)
    .then(response => {
      callback(null, response);
    })
    .catch(error => {
      callback(error);
    })
}

const addUser = (name, googleID, token, callback) => {
  db('users').insert({name: name, googleID: googleID, token: token})
    .then(response => {
      callback(null, response);
    })
    .catch(error => {
      console.error('error from addUser:', error)
      callback(error);
    });
}

//modify to accept user id
const insertSearch = (searchString, userId, callback) => {
  db('trends').insert({name: searchString, user_id: userId}).then((resp) => {
    callback(null, resp);
  }).catch((err) => {
    callback(err, null);
  });
};

const getSearches = (numberOfSearches, userId, callback) => {
  db.select('name').from('trends').then((data) => {
  // db('trends').whereNot('userId', userId).then(data => {
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

const getUserSearches = (numberOfSearches, userId, callback) => {
  // db('trends').where('userId', userId)
  db.select('name').where('userId', userId).from('trends')
    .then( data => {
      callback(null, data);
    })
    .catch( error => {
      callback(error, null);
    })
}


module.exports.insertSearch = insertSearch;
module.exports.getSearches = getSearches;
module.exports.findUser = findUser;
module.exports.addUser = addUser;
module.exports.getUserSearches = getUserSearches;
