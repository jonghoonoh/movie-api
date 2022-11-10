const express = require('express');

const router = express.Router();

router
  .route('/')
  .get((req, res) => res.send('Actor router get'))
  .post((req, res) => res.send('Actor router post'));

module.exports = router;
