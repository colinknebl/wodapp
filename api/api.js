const express       = require('express'),
      api           = express.Router(),
      mongodb       = require('../database/database'),
      bcrypt        = require('bcrypt-nodejs'),
      crypto        = require('crypto'),
      jwt           = require('jsonwebtoken'),
      dbconfig      = require('../config/databaseConfig');


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
  res.send({result: 'success'});
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
                    success: false,
                    message: 'User registration failed.'
                  });
                }

              })
              .catch(err => console.error(err));
      })
      .catch(err => {
        res.send(err);
      });
  }
  else {
    res.json(dataVerification);
  }
});

api.get('/api/check-username/v1/:username', (req, res) => {

  if (req.params.username) {

    let usernameCheckQuery = mongodb.checkRegisteredUsers.v3(req.params.username, null);

    usernameCheckQuery
      .then(usernameCheck => {

        if (usernameCheck.success === true) {
          res.json({ 
            success : true,
            message : 'Username is available.'
          });
        }
        else {
          res.json(usernameCheck);
        }   
      })
      .catch(err => res.json(err));
  }
  else {
    res.json({
      success : false,
      message : 'Username was not provided.'
    });
  }
  
});

api.get('/api/check-email/v1/:email', (req, res) => {

  if (req.params.email) {

    let emailCheckQuery = mongodb.checkRegisteredUsers.v3(null, req.params.email);

    emailCheckQuery
      .then(emailCheck => {

        if (emailCheck.success === true) {
          res.json({ 
            success : true,
            message : 'Email address is available.'
          });
        }
        else {
          res.json(emailCheck);
        }   
      })
      .catch(err => res.json(err));
  }
  else {
    res.json({
      success : false,
      message : 'Email was not provided.'
    });
  }
  
});

// colinknebl
// Special25!

api.post('/api/auth/login/v1', (req, res) => { 

  if (req.body.username && req.body.password) {

    let userLoginQuery = mongodb.login.v1(req.body.username);

    userLoginQuery
      .then(user => {
        const comparePass = helpers.comparePasswords(req.body.password, user.user.password);

        if (comparePass) {
          const token = jwt.sign({ userId: user.user._id }, dbconfig.secret, { expiresIn: '24h' });
          res.json({
            success : true,
            message : 'User logged in successfully!',
            token   : token,
            user    : {
              username: user.user.username
            }
          });
        }
        else {
          res.json({
            success : false,
            message : 'Incorrect password provided.'
          });
        }
      })
      .catch(err => res.json(err));
  }
  else {
    res.json({
      success : false,
      message : 'Login Failed, username and password must be provided.'
    });
  }
   
});

/*
  MIDDLEWARE FOR GETTING THE TOKEN FROM THE REQUEST HEADERS
  NOTE: Any routes that require authentication and need access to the token need to be under the middleware.
*/
api.use((req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, dbconfig.secret, (err, decoded) => {
      if (err) {
        res.json({
          success: false,
          message: `Token invalid: ${err.message}`
        });
      }
      else {
        req.decoded = decoded;
        next();
      }
    });
  }
  else {
    res.json({
      success: false,
      message: 'No token provided.'
    });
  }
});
// *******************


api.get('/api/auth/get-account-info/v1/', (req, res) => {

  let getUserQuery = mongodb.accountLookup.v1(req.decoded.userId);

  getUserQuery
    .then(userData => {
      console.log(userData);
      if (userData.success) {
        res.json({
          user: {
            firstName: userData.user.firstName,
            lastName: userData.user.lastName,
            username: userData.user.username,
            email: userData.user.email
          }
        });
      }
      else {
        res.json({
          success: false,
          message: 'User account info not found.'
        });
      }
    })
    .catch(err => res.json(err));

});

api.get('/api/auth/get-account-info/testing/', (req, res) => {

  let getUserQuery = mongodb.accountLookup.v1(req.decoded.userId);

  getUserQuery
    .then(userData => {
      console.log(userData);
      if (userData.success) {
        res.json({
          user: {
            image: 'https://profilepicsbucket.crossfit.com/35d67-P11435_11-184.jpg',
            firstName: 'Rich',
            lastName: 'Froning',
            email: 'rich.froning@gmail.com',
            username: 'rich007',
            affiliate: 'Crossfit Mayhem',
            max: {
              squat: 425,
              dead: 475,
              snatch: 295,
              bench: 385
            }
          }
        });
      }
      else {
        res.json({
          success: false,
          message: 'User account info not found.'
        });
      }
    })
    .catch(err => res.json(err));

});

module.exports = api;











helpers = {

  comparePasswords: (userPassword, dbPassword) => {
    return bcrypt.compareSync(userPassword, dbPassword);
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
      let validFirstName = validators.firstName(user.firstName);
      let validLastName = validators.lastName(user.lastName);
      let validEmail = validators.email(user.email);
      let validUsername = validators.username(user.username);
      let validPassword = validators.password(user.password, user.confirm);

      if (!validFirstName.success) {
        return validFirstName;
      }
      else if (!validLastName.success) {
        return validLastName;
      }
      else if (!validEmail.success) {
        return validEmail;
      }
      else if (!validUsername.success) {
        return validUsername;
      }
      else if (!validPassword.success) {
        return validPassword;
      }
      else {
        return { 'success' : true };
      }
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

validators = {
  firstName: (firstName) => {
    if (!firstName) {
      return false;
    }
    else {
      if (firstName.length < 1 || firstName.length > 20) {
        return {
          'success' : false,
          'message' : `Your first name was ${firstName.length} characters long. It must be greater than 1 and less than 20 characters.`
        };
      }
      else {
        return {
          'success' : true
        };
      }
    }
  },

  lastName: (lastName) => {
    if (!lastName) {
      return false;
    }
    else {
      if (lastName.length < 1 || lastName.length > 20) {
        return {
          'success' : false,
          'message' : `Your last name was ${lastName.length} characters long. It must be greater than 1 and less than 20 characters.`
        };
      }
      else {
        return {
          'success' : true
        };
      }
    }

  },

  email: (email) => {
    if (!email) {
      return false;
    }
    else {
      const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

      let valid = regExp.test(email);
      if (valid) {
        return { 
          'success' : true
        };
      }
      else {
        return { 
          'success' : false,
          'message' : `Email ${email} formatted improperly`
        };
      }
    }
  },

  username: (username) => {

    if (!username) {
      return false;
    }
    else if (username.length < 5 || username.length > 20) {
      return {
        'success' : false,
        'message' : `Your username was ${username.length} characters. It must be 5-20 characters in length.`
      };
    }
    else {
      const regExp = new RegExp(/^[a-zA-Z0-9]+$/);

      let valid = regExp.test(username);
      if (valid) {
        return { 
          'success' : true
        };
      }
      else {
        return { 
          'success' : false,
          'message' : `Username ${username} formatted improperly. No special characters allowed.`
        };
      }
    }
  },

  password: (password, confirm) => {
    if (!password || !confirm) {
      return { 
        'success' : false,
        'message' : 'You did not provide the password and/or confirm password.'
      };
    }
    else if (password.length < 8 || password.length > 35) {
      return {
        'success' : false,
        'message' : `Your password was ${password.length} characters. It must be 8-35 characters in length.`
      };
    }
    else if (password !== confirm) {
      return {
        'success' : false,
        'message' : 'Passwords do not match.'
      };
    }
    else {
      const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);

      let valid = regExp.test(password);
      if (valid) {
        return { 
          'success' : true
        };
      }
      else {
        return { 
          'success' : false,
          'message' : `Password must have at least one uppercase letter, one lowercase letter, one number, and one special characher.`
        };
      }
    }
  }
};