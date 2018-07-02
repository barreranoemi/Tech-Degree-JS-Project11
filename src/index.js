'use strict';

// load modules
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const seeder = require('mongoose-seeder');

var mongoose = require('mongoose');
const data = require('./data/data.json');

var routes = require('./routes/api')

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/CourseRating", {useMongoClient: true});
const port = 5000;
var db = mongoose.connection;
db.on('error', function(err) {
	console.log(err);
})

db.on('open', function() {
	seeder.seed(data)
	.then(function(dbData) {} )
	.catch(function(err) {
		console.log(err);
	});
	console.log("Successfully connected to Mongo database.");
})

// set our port
app.set('port', process.env.PORT || 5000);

// morgan gives us http request logging
app.use(morgan('dev'));

// TODO add additional routes here

// send a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Course Review API'
  });
});

// uncomment this route in order to test the global error handler
// app.get('/error', function (req, res) {
//   throw new Error('Test error');
// });

// send 404 if no other route matched
app.use(function(req, res) {
  var err = new Error();
  err.message = 'File Not Found';
  err.status = 404;
  next(err);
});

// Express global error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json(err);
});

// start listening on our port
var server = app.listen(app.get('port'), function() {
  console.log('Express server is listening on port ' + server.address().port);
});
