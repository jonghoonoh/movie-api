const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    require: true,
  },
  content: {
    type: String,
    required: true,
  },
}, { 
  timestamps: true
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
