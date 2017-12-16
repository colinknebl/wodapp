const express       = require('express'),
      api           = express.Router(),
      mongodb       = require('../database/database');

api.get('/api/get-wod/:_id', (req, res) => {

  let _id = req.params._id;
  let wodQuery = mongodb.getWod(_id);

  wodQuery
    .then((wod) => {
      res.json(wod);
    })
    .catch(err => console.error(err));
});

module.exports = api;