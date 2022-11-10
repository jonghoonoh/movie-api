const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/reviews');

const app = express();
app.use(logger);

const reviewRouter = require('./routes/review');
app.use('/reviews', reviewRouter);

async function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}

app.listen(3000, () => console.log('Server Started'));
