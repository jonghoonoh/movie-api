const express = require('express');
const mongoose = require('mongoose');
let reviews = require('./reviews.json');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost/reviews');

const Review = require('./models/review');

app.get('/reviews', async (req, res) => {
  const count = Number(req.query.count) || 0;
  const order = req.query.order || 'createdAt';
  let reviews;
  reviews = await Review.find().limit(count).sort([[order, 'desc']]);
  res.send(reviews);
});

app.post('/reviews', async (req, res) => {
  const newReview = await Review.create(req.body);
  res.send(newReview);
});

app.get('/reviews/:id', async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (review) {
    res.send(review);
  } else {
    res.status(404).send({ message: 'Review not found' });
  }
});

app.put('/reviews/:id', async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (review) {
    const newInfo = req.body;
    Object.keys(newInfo).forEach(key => {
      review[key] = newInfo[key];
    });
    await review.save();
    res.send(review);
  } else {
    res.status(404).send({ message: 'Review not found' });
  }
});

app.delete('/reviews/:id', async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (review) {
    await review.remove();
    res.sendStatus(200);
  } else {
    res.status(404).send({ message: 'Review not found' });
  }
});

app.listen(3000, () => console.log('Server Started'));
