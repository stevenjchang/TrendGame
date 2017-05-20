var db = require('./config');
const findUnique = require('../utilities/findUnique');

const findUser = (googleID, callback) => {
  db('users').where('googleID', googleID)
    .then(response => {
      console.log('response after findUser: ', response);
      callback(null, response);
    })
    .catch(error => {
      callback(error);
    })
}

//add image url 
const addUser = (name, googleID, token, photo, callback) => {
  db('users').insert({name: name, googleID: googleID, token: token, photo: photo})
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
  db('trends').insert({name: searchString, userId: userId}).then((resp) => {
    callback(null, resp);
  }).catch((err) => {
    callback(err, null);
  });
};

const getSearches = (numberOfSearches, userId, callback) => {
  let query; 
  if (userId === 0) {
    //select all names from trends, both null and not null userId column values
    query = 'SELECT name FROM trends WHERE "userId" > 0 OR "userId" IS NULL'
  } else {
    //select all names where userId does not equal passed in userId and all null values
    query = 'SELECT name FROM trends WHERE "userId" !=' + userId + 'OR "userId" IS NULL'
  } 
   db.raw(query).then(data => {
    let dataNoDups = findUnique(data.rows);
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


const getUserInfo = (userId, callback) => {
  db.select('name', 'photo').where('userId', userId).from('users')
    .then(data => {
      callback(null, data);
    })
    .catch(error => {
      callback(error, null);
    })
}


module.exports.insertSearch = insertSearch;
module.exports.getSearches = getSearches;
module.exports.findUser = findUser;
module.exports.addUser = addUser;
module.exports.getUserSearches = getUserSearches;
