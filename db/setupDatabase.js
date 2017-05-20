//set up the database if not exist
// This file should be run once from the command line to initialize the db schema.  Be sure to edit the url const with the target url.
const pg = require('pg');

const url = 'postgres://liqoudqyciuxfv:2180483673ffe302e126b458287cfb26c833479816589cb3b9e41c6d9ec9c717@ec2-184-73-236-170.compute-1.amazonaws.com:5432/deb9kpg1d0je75' + '?ssl=true';

var db = require('knex')({
  client: 'pg',
  connection: url
});

db.schema.hasTable('users').then(exists => {
  if (!exists) {
    db.schema.createTable('users', (user) => {
      user.increments('id').primary();
      user.string('name');
      user.string('googleID');
      user.string('token');
      user.string('photo');
    })
    .then((table) => {
      console.log('Created users table');
    })
  }
});

db.schema.hasTable('trends').then(function (exists) {
  if (!exists) {
    db.schema.createTable('trends', function (trend) {
      trend.increments('id').primary();
      trend.string('name');
      trend.timestamps(true, true);
      trend.integer('userId');
    }).then(function (table) {
      console.log('Created Table trends');
    });
  }
});

db.schema.hasTable('weeks').then(function (exists) {
  if (!exists) {
    db.schema.createTable('weeks', function (week) {
      week.increments('id').primary();
      week.string('startDate');
      week.integer('popularity');
      week.integer('trendId').unsigned();
      week.foreign('trendId').references('trends.id');
    }).then(function (table) {
      console.log('created Table weeks');
    });
  }
});

db.schema.hasTable('stories').then(function (exists) {
  if (!exists) {
    db.schema.createTable('stories', function (story) {
      story.increments('id').primary();
      story.string('articleName', 500);
      story.string('mediaUrl', 200);
      story.string('url', 500);
      story.string('previewText', 1000);
      story.integer('weeksId').unsigned();
      story.foreign('weeksId').references('weeks.id');
    }).then(function (table) {
      console.log('created Table stories');
    });
  }
});


