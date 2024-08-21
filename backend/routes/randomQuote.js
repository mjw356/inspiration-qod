const express = require('express');
const router = express.Router();
const { getRandomQuote: getRandomQuote } = require('../lib/utils');

router.route('/')
  .get((req, res) => {
    getRandomQuote()
    .then((message) => {
      res.json(message)
    })

  })

module.exports = router;
