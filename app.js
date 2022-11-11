const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.DATABASE_URL);

const Review = require('./models/review');

app
  .route('/reviews')
  .get(async (req, res) => {
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
  })
  .post(async (req, res) => {
    try {
      const newReview = await Review.create(req.body);
      res.send(newReview);
    } catch (e) {
      res.status(400).send({ message: e.message });
    }
  });

app
  .route('/reviews/:id')
  .get(async (req, res) => {
    try {
      const review = await Review.findById(req.params.id);
      if (review) {
        res.send(review);
      } else {
        res.status(404).send({ message: 'Review not found' });
      }
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  })
  .put(async (req, res) => {
    try {
      const review = await Review.findById(req.params.id);
      if (review) {
        const newInfo = req.body;
        Object.keys(newInfo).forEach((key) => {
          review[key] = newInfo[key];
        });
        await review.save();
        res.send(review);
      } else {
        res.status(404).send({ message: 'Review not found' });
      }
    } catch (e) {
      res.status(400).send({ message: e.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const review = await Review.findById(req.params.id);
      if (review) {
        await review.remove();
        res.sendStatus(200);
      } else {
        res.status(404).send({ message: 'Review not found' });
      }
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  });

app.listen(process.env.PORT || 3000, () => console.log('Server Started'));
