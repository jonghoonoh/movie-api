const express = require('express');
let reviews = require('./reviews.json');

const app = express();

app.use(express.json());

app
  .route('/reviews')
  .get((req, res) => {
    const count = Number(req.query.count);
    if (count >= 0 && count < reviews.length) {
      res.send(reviews.slice(0, count));
    } else {
      res.send(reviews);
    }
  })
  .post((req, res) => {
    const newReview = req.body;
    reviews.push(newReview);
    res.send(newReview);
  });

app
  .route('/reviews/:id')
  .get((req, res) => {
    const { id } = req.params;
    const review = reviews.find((r) => r.id === Number(id));
    if (review) {
      res.send(review);
    } else {
      res.status(404).send({ message: 'Review not found' });
    }
  })
  .put((req, res) => {
    const { id } = req.params;
    const review = reviews.find((r) => r.id === Number(id));
    if (review) {
      const newInfo = req.body;
      Object.keys(newInfo).forEach((key) => {
        review[key] = newInfo[key];
      });
      res.send(review);
    } else {
      res.status(404).send({ message: 'Review not found' });
    }
  })
  .delete((req, res) => {
    const { id } = req.params;
    const initialCount = reviews.length;
    reviews = reviews.filter((r) => r.id !== Number(id));
    if (reviews.length < initialCount) {
      res.sendStatus(200);
    } else {
      res.status(404).send({ message: 'Review not found' });
    }
  });

app.listen(3000, () => console.log('Server Started'));
