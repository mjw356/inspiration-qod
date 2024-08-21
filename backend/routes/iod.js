const express = require('express');
const { getIod, setIod } = require('../lib/utils');

const router = express.Router();

router.route('/')
  .get((req, res) => {
    getIod()
      .then((message) => res.json(message))
      .catch((err) => {
        if (!err.iod) {
          setIod()
            .then(() => getIod()).then((message) => res.json(message))
            .catch(() => res.status(500).send());
        }
      });
  });

module.exports = router;
