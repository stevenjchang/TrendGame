var db = require('./config');
const findUnique = require('../utilities/findUnique');


// const addOrFindUser = (googleID, callback) => {
//   db('users').insert({googleID: googleID})
//     .then(response => {
//       callback(null, response);
//     })
//     .catch(error => {
//       callback(error, null);
//     });
// }

const findUser = (googleID, callback) => {
  console.log('GOOGLEID FROM FINDUSER QUERY', googleID)
  db('users').where('googleID', googleID)
    .then(response => {
      console.log('FIND USER QUERY RESPONSE:', response)
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
module.exports.findUser = findUser;
module.exports.addUser = addUser;
