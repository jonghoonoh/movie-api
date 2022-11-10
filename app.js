const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());
app.use(logger);

mongoose.connect('mongodb://localhost/reviews');

const Review = require('./models/review');

app.get('/reviews', async (req, res) => {
  const count = Number(req.query.count) || 0;
  const order = req.query.order || 'createdAt';
  try {
    const reviews = await Review.find()
      .limit(count)
      .sort([[order, 'desc']]);
    res.send(reviews);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

app.post('/reviews', async (req, res) => {
  try {
    const newReview = await Review.create(req.body);
    res.send(newReview);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

app.get('/reviews/:id', getReview, async (req, res) => {
  res.send(req.review);
});

app.put('/reviews/:id', getReview, async (req, res) => {
  const newInfo = req.body;
  const review = req.review;
  Object.keys(newInfo).forEach((key) => {
    review[key] = newInfo[key];
  });
  try {
    await review.save();
    res.send(review);
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

app.delete('/reviews/:id', getReview, async (req, res) => {
  try {
    await req.review.remove();
    res.sendStatus(200);
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

async function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}

async function getReview(req, res, next) {
  let review;
  try {
    review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).send({ message: 'Review not found' });
    }
    req.review = review;
    next();
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
}

app.listen(3000, () => console.log('Server Started'));
