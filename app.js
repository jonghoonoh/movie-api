require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL);

const app = express();
app.use(require('./middlewares/logger'));
app.use('/media', express.static('media'));
app.use('/reviews', require('./routes/reviews'));
app.use('/movies', require('./routes/movies'));
app.use('/actors', require('./routes/actors'));

app.listen(process.env.PORT || 3000, () => console.log('Server Started'));
