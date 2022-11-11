const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 40,
  },
  rating: {
    type: Number,
    require: true,
    min: 0,
    max: 5,
  },
  content: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        const words = v.split(' '); 
        return words.length > 5;
      },
      message: () => 'Must exceed 5 words',
    }
  },
  imgUrl: {
    type: String,
  },
}, {
  timestamps: true
});

const Review = mongoose.model('Review', ReviewSchema);

module.exports = Review;
