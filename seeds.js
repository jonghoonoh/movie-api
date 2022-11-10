const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/reviews');

const Review = require('./models/review');

const reviews = require('./seed-reviews.json');

const seedDB = async () => {
  await Review.deleteMany({});
  await Review.insertMany(reviews);
};

seedDB().then(() => mongoose.connection.close());
