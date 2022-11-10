const express = require('express');

const router = express.Router();

router
  .route('/')
  .get((req, res) => res.send('Movie router get'))
  .post((req, res) => res.send('Movie router post'));

module.exports = router;
