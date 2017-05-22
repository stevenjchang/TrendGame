var db = require('./config');
const findUnique = require('../utilities/findUnique');
const _ = require('lodash');

const findUser = (googleID, callback) => {
  db('users').where('googleID', googleID)
    .then(response => {
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
    query = 'SELECT name FROM trends WHERE "userId" > 0 OR "userId" IS NULL ORDER BY id'
  } else {
    //select all names where userId does not equal passed in userId and all null values
    query = 'SELECT name FROM trends WHERE "userId" !=' + userId + 'OR "userId" IS NULL ORDER BY id'
  } 
   db.raw(query).then(data => {
     console.log('get ALL searches data: ', data)
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

  db.select('name').where('userId', userId).from('trends').then( data => {    
   let dataClean = data.map(search => {
     return search.name
   })
   console.log('DATA CLEAN :', dataClean)
    callback(null, _.uniqBy(dataClean));
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

const postToggleFavorite = (trend, userId, callback) => {
  let query;
  query = 'UPDATE trends SET favorite = NOT favorite WHERE "userId" = ' + userId + ' AND name = ' + "'" + trend + "'";
  db.raw(query)
    .then(success => {
      callback(null, success);
    })
    .catch(error => {
      console.log('error! postToggleFavorite/queries.js ');
      callback(error, null);
    })
}

const getValueOfFavorite = (trend, userId, callback) => {
  // SELECT favorite FROM trends where name = 'google' AND "userId" = 1;
  db.select('favorite').where('userId', userId).andWhere('name', trend).from('trends')
    .then(response => {
      callback(null, response);
    })
    .catch( error => {
      console.log('Error! getValueOfFavorite/queries.js', error);
      callback(error, null);
    })
}

module.exports.insertSearch = insertSearch;
module.exports.getSearches = getSearches;
module.exports.findUser = findUser;
module.exports.addUser = addUser;
module.exports.getUserSearches = getUserSearches;
module.exports.postToggleFavorite = postToggleFavorite;
module.exports.getValueOfFavorite = getValueOfFavorite;
