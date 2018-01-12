const express       = require('express'),
      api           = express.Router(),
      mongodb       = require('../database/database'),
      bcrypt        = require('bcrypt-nodejs');


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

api.post('/api/register-user/v1', (req, res) => {

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
  mongodb.addRegisteredUser.v1(req.body, today);
  // res.send({'result': 'success'});

});

api.post('/api/register-user/v2', (req, res) => {
  
  let dataVerification = helpers.newUserDataCheck(req.body, res);
  
  if (dataVerification.success) {

    let checkRegisteredUsernames = mongodb.checkRegisteredUsers.checkUsername(req.body.username);
    
    checkRegisteredUsernames
      .then(usernameCheck => {
        if (usernameCheck.success) {
          return mongodb.checkRegisteredUsers.checkEmail(req.body.email);
        }
        else {
          res.json(usernameCheck);
        }

      })
      .then(emailCheck => {
        if (emailCheck.success) {
          return helpers.encryptPassword(req.body.password);
        }
        else {
          res.json(emailCheck);
        }
      })
      .then(encryptedPassword => {
        
        let today = Date();

        req.body.password = encryptedPassword;

        let addUser = mongodb.addRegisteredUser.v2(req.body, today);

            addUser
              .then(addUser => {

                if (addUser.success) {
                  res.send(addUser);
                }
                else {
                  console.log('failed to add user the database. tag: 12039ugadsn6%Y^gasdgv');
                  res.send({
                    'success': false,
                    'message': 'User registration failed.'
                  });
                }

              })
              .catch(err => console.error(err));
      })
      .catch(err => {
        res.send(err);
      });
  }

});




api.post('/api/register-user/v3', (req, res) => {

  let dataVerification = helpers.newUserDataCheck(req.body, res);
  
  if (dataVerification.success) {

    let checkRegisteredUsers = mongodb.checkRegisteredUsers.v3(req.body.username, req.body.email);
    
    checkRegisteredUsers
      .then(userCheck => {

        if (userCheck.success) {
          return helpers.encryptPassword(req.body.password);
        }
        else {
          res.json(userCheck);
        }

      })
      .then(encryptedPassword => {
        
        let today = Date();

        req.body.password = encryptedPassword;

        let addUser = mongodb.addRegisteredUser.v2(req.body, today);

            addUser
              .then(addUser => {

                if (addUser.success) {
                  res.send(addUser);
                }
                else {
                  console.log('failed to add user the database. tag: 12039ugadsn6%Y^gasdgv');
                  res.send({
                    'success': false,
                    'message': 'User registration failed.'
                  });
                }

              })
              .catch(err => console.error(err));
      })
      .catch(err => {
        res.send(err);
      });
  }
});

module.exports = api;

helpers = {

  comparePasswords: (password) => {
    return bcrypt.compareSync(password, this.password);
  },


  newUserDataCheck: (user, res) => {
    if (!user.firstName) {
      res.json({
        success: false,
        message: 'You must provide your first name.'
      });
    } 
    else if (!user.lastName) {
      res.json({
        success: false,
        message: 'You must provide your last name.'
      });
    }
    else if (!user.email) {
      res.json({
        success: false,
        message: 'You must provide your email address.'
      });
    }
    else if (!user.username) {
      res.json({
        success: false,
        message: 'You must provide a username.'
      });
    }
    else if (!user.password) {
      res.json({
        success: false,
        message: 'You must provide a password.'
      });
    }
    else {
      return { 'success' : true };
    } 
  },

  encryptPassword: (password) => {

    return new Promise((resolve, reject) => {

      bcrypt.hash(password, null, null, function(err, hash) {

        if (err) throw err;
        password = hash;

        if (password) {
          resolve(password);
        } else {
          reject('Failed to encrypt password.');
        }
      });
    }); 
  }

};