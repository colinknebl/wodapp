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

api.post('/api/add-user', (req, res) => {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let today = Date();
  mongodb.addUser(firstName, lastName, email, today, userNum);
  res.send({'result': 'success'});
});

api.post('/api/contact-form', (req, res) => {

  let today = Date();

  let contactData = {
    firstName   : req.body.firstName,
    lastName    : req.body.lastName,
    email       : req.body.email,
    requestType : req.body.requestType,
    message     : req.body.message,
    dateAdded   : today
  };
  mongodb.addContactRequest(contactData);
  res.send({'result': 'success'});

});

module.exports = api;