const express = require('express');
let reviews = require('./reviews.json');

const app = express();

app.use(express.json());

app.get('/reviews', (req, res) => {
  const count = Number(req.query.count);
  if (count >= 0 && count < reviews.length) {
    res.json(reviews.slice(0, count));
  } else {
    res.json(reviews);
  }
});

app.post('/reviews', (req, res) => {
  const newReview = req.body;
  reviews.push(newReview);
  res.json(newReview);
});

app.get('/reviews/:id', (req, res) => {
  const { id } = req.params;
  const review = reviews.find(r => r.id === Number(id));
  if (review) {
    res.json(review);
  } else {
    res.status(404).send({ message: 'Review not found' });
  }
});

app.put('/reviews/:id', (req, res) => {
  const { id } = req.params;
  const review = reviews.find(r => r.id === Number(id));
  if (review) {
    const newInfo = req.body;
    Object.keys(newInfo).forEach(key => {
      review[key] = newInfo[key];
    });
    res.send(review);
  } else {
    res.status(404).send({ message: 'Review not found' });
  }
});

app.delete('/reviews/:id', (req, res) => {
  const { id } = req.params;
  const initialCount = reviews.length;
  reviews = reviews.filter(r => r.id !== Number(id));
  if (reviews.length < initialCount) {
    res.sendStatus(200);
  } else {
    res.status(404).send({ message: 'Review not found' });
  }
});

app.listen(3000, () => console.log('Server Started'));
