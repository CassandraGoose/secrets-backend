const express = require('express');
const router = express.Router();
const knex = require('../db');

router.get('/', (req, res) => {
  res.status(200).json({
    hello: 'thanks for finding me.'
  });
});

router.post('/', (req, res) => {
  var theSecret = {
    text: req.body.text
  }
  knex('secret')
    .insert(theSecret)
    .then(secrets => {
      res.json(secrets);
    });
});

module.exports = router;
