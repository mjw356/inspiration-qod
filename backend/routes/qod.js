const express = require('express');
const router = express.Router();
const { getQod, setQod } = require('../lib/utils');

router.route('/')
  .get((req, res) => {
    getQod()
    .then((message) => res.json(message))
    .catch((err) => {
      if(!err.qod){
        setQod()
        .then(() => getMod()).then((message) => res.json(message))
        .catch(() => res.status(500).send())
      }
    })

  })

module.exports = router;
