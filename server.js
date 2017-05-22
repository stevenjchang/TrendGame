require('dotenv').config();
const makeTimeline = require('./utilities/makeTimeline');
const queries = require('./db/queries');
const cleanData = require('./utilities/cleanSearch');
const makeArticles = require('./utilities/makeArticles.js');

const passport = require('./utilities/googlePassportHelper.js');
const express = require('express');
const session = require('express-session');
const Cookies = require('universal-cookie');
const request = require('request');
const bodyParser = require('body-parser');
const morgan = require('morgan');
var worker = require('./workers/worker');

const app = express();
const IP = process.env.HOST;
const PORT = process.env.PORT;


app.use(express.static(__dirname + '/client/public'));
app.use(bodyParser.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  resave: true,
  name: 'trendzilla'
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(morgan('tiny'));
worker.worker(`http://${IP}:${PORT}/api/worker`);

if (!module.parent) {
  app.listen(PORT, () => {
    console.log(`Listening on ${IP}:${PORT}`);
  });
}

app.get('/api', (req, res) => {
  res.send({
    version: '0.0.1'
  });
});

app.get('/', (req, res, next) => {
  
  if (req.session.user) {
    let user = req.session.user[0];
    res.cookie('loggedIn', true, {path: '/'});
  }
  res.sendFile(__dirname + '/client/public/_index.html')
});


// signup or login
app.get('/auth/google', 
  passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/userinfo.profile']
  }
));

app.get('/auth/google/callback', 
  passport.authenticate('google', {
    failureRedirect: '/' }),
      (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
  });

  app.get('/logout', (req, res) => {
    req.session.destroy(err => {
      res.clearCookie('loggedIn');
      res.redirect('/');
      if (err) {
        res.send(err);
      }
    })
  });

app.get('/api/timeline', (req, res) => {
  let trend = req.query.q;
  let startTime;
  let endTime;

  if (req.query.start) {
    startTime = JSON.parse(req.query.start);
  }
  if (req.query.end) {
    endTime = JSON.parse(req.query.end);
  }

  trend = cleanData.prepForAylien(trend);
  makeTimeline(trend, startTime, endTime, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get('/api/articles', (req, res) => {
  let trend = req.query.trend;
  let date = req.query.date;

  trend = cleanData.prepForAylien(trend);

  makeArticles(trend, date, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
})

app.get('/api/user', (req, res) => {
  let userId = req.session.user[0].id
  queries.getUserInfo(userId, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
})

app.post('/api/history', (req, res) => {
  let trend = req.body.search;
  let userId = 0;
  if (req.session.user === undefined) {
    userId = null;
  } else {
    userId = req.session.user[0].id
  }
  // let userId = req.session.user[0].id;
  if (cleanData.checkIsReadyForDb(trend)) {
    trend = cleanData.prepForDb(trend);
    queries.insertSearch(trend, userId, (err, resp) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(resp);
      }
    });
  } else {
    res.status(400).send();
  }
});

app.get('/api/history', (req, res) => {
  let userId = 0;
  if (req.session.user) {
    userId = req.session.user[0].id 
  }
  queries.getSearches(10, userId, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get('/api/history/user', (req, res) => {
  if (req.session.user) {
    let userId = req.session.user[0].id;
    queries.getUserSearches(10, userId, (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  }
});

app.post('/api/favorite/user', (req, res) => {
  let userId;
  if (req.session.user) {
    console.log('*************** if req.session.user[0].id');
    userId = req.session.user[0].id;
  }
  let trend = req.body.trend ? req.body.trend : 'casper';
  console.log('userId ->', userId);
  queries.postToggleFavorite(trend, userId, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get('/api/favorite/user', (req, res) => {
    console.log('attempt');

  let userId;
  if (req.session.user) {
    userId = req.session.user[0].id;
  }
  let trend = req.query.trend ? req.query.trend : 'casper';
  console.log('userId ->', userId);
  console.log('trend ->', trend, 'req.query.trend =>', req.query.trend);

  queries.getValueOfFavorite(trend, userId, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }

  })

})

app.get('/api/worker', (req, res) => {
  res.send("Im awake!!");
});

app.use((req, res) => {
  res.status(404);
  res.sendFile(__dirname + '/client/public/404.html');
});

module.exports = app;
