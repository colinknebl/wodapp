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
  let today = Date();
  mongodb.addUser(req.body, today);
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

api.post('/api/register-user', (req, res) => {

  let x = 1;
  console.log('REGISTER ' + x +' USER!!!',req.body);
  x++;

  let today = Date();

  // let contactData = {
  //   firstName   : req.body.firstName,
  //   lastName    : req.body.lastName,
  //   email       : req.body.email,
  //   requestType : req.body.requestType,
  //   message     : req.body.message,
  //   dateAdded   : today
  // };
  mongodb.addRegisteredUser(req.body, today);
  // res.send({'result': 'success'});

});

module.exports = api;