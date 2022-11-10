const express = require('express');

const router = express.Router();
router.use(express.json());

const Review = require('../models/review');

router
  .route('/')
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

router
  .route('/:id')
  .all(getReview)
  .get(async (req, res) => {
    res.send(req.review);
  })
  .put(async (req, res) => {
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
  })
  .delete(async (req, res) => {
    try {
      await req.review.remove();
      res.sendStatus(200);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  });

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

module.exports = router;
