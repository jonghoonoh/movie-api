const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/reviews');

const app = express();
app.use(require('./middlewares/logger'));

app.use('/reviews', require('./routes/reviews'));
app.use('/movies', require('./routes/movies'));
app.use('/actors', require('./routes/actors'));

app.listen(3000, () => console.log('Server Started'));
