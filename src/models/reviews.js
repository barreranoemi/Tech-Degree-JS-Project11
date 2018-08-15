'use strict';

var mongoose = require('mongoose');

var ReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  postenOn: {
    type: Date,
    default: Date.now
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required.'],
    min: 1,
    max: 5
   },
  review: String
});


var Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;