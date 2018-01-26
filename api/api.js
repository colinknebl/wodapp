const express       = require('express'),
      api           = express.Router(),
      mongodb       = require('../database/database'),
      bcrypt        = require('bcrypt-nodejs'),
      crypto        = require('crypto'),
      jwt           = require('jsonwebtoken'),
      dbconfig      = require('../config/databaseConfig');


api.post('/api/footer-form', (req, res) => {
  mongodb.addUserEmail(req.body.email)
    .then(result => {
      res.send(result);
    });
});


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
  
  let addUser = mongodb.addUser(req.body, today);

  addUser
    .then(result => {
      res.send(result);
    })
    .catch(err => res.send(err));

});

api.post('/api/contact-form', (req, res) => {

  console.log(req.body);

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
  res.send({
    success: true,
    message: 'Thank you for your feedback! If required, someone will contact you soon.'
  });

});

api.post('/api/register-user/v3', (req, res) => {

  let dataVerification = validators.newUserDataCheck(req.body, res);
  
  if (dataVerification.success) {

    let checkRegisteredUsers = mongodb.checkRegisteredUsers.v3(req.body.username, req.body.email);
    
    checkRegisteredUsers
      .then(userCheck => {

        if (userCheck.success) {
          return password.encryptPassword(req.body.password);
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

api.post('/api/auth/login/v1', (req, res) => {

  console.log(req.body);
  if (req.body.username && req.body.password) {

    let userLoginQuery = mongodb.login.v1(req.body.username);

    userLoginQuery
      .then(user => {

        const comparePass = password.comparePasswords(req.body.password, user.user.password);
        
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

api.get('/api/auth/get-account-info/testing/', (req, res) => {
  res.json({
    success: true,
    message: 'User account info found',
    user: {
      image: 'https://media-exp2.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAruAAAAJGU0YmZlMWFiLWI5ZTUtNGQxOC04NmZlLWZlYjg1ODk5NmNiOA.jpg',
      firstName: 'Colin',
      lastName: 'Knebl',
      email: 'colin.knebl@outlook.com',
      username: 'colinknebl',
      affiliate: 'home gym',
      gender: 'male',
      skillLvl: 'intermediate',
      max: {
        squat: 275,
        dead: 315,
        snatch: 185,
        bench: 285
      },
      time: {
        murph: {
          hours: 1,
          minutes: 5,
          seconds: 14
        },
        diane: {
          hours: 0,
          minutes: 25,
          seconds: 14
        },
        dt: {
          hours: 0,
          minutes: 15,
          seconds: 26
        },
        badger: {
          hours: 1,
          minutes: 35,
          seconds: 49
        }
      },
      equipment: {
        barbell          : true,
        dumbbells        : null,
        plates           : true,
        rack             : null,
        bench            : null,
        jumpRope         : null,
        box              : true,
        kBell            : null,
        dipStation       : null,
        pullUpBar        : null,
        medBall          : null,
        rings            : null,
        climbimgRope     : null,
        conditioningRope : true,
        sled             : null,
        sledgeHammer     : null,
        abMat            : null,
        resBands         : null,
        tire             : null,
        sandbag          : null,
        chains           : null,
        pegBoard         : null,
        ghd              : null,
        airBike          : null,
        rower            : true,
        skiErg           : true,
        treadmill        : null,
        outdoorRun       : null,
      }
    }
  });
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
    if (
      req.path === '/api/auth/get-account-info/v1/' || 
      req.path === '/api/auth/get-account-info/testing/' ||
      req.path === '/api/update-user/v1'
    ) {
      res.json({
        success: false,
        message: 'No token provided.'
      });
    }
    else {
      res.redirect('/');
    }
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
          success: true,
          message: 'User account loaded successfully.',
          user: userData.user
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


api.post('/api/update-user/v1', (req, res) => {

  const user = {
    _id: req.decoded.userId,
    user: req.body
  };

  const updateUserData = mongodb.updateUser.v1(user);

  updateUserData
    .then(result => {
      console.log('sending back response...',result);
      res.json(result);
    })
    .catch(err => res.json(err));
});


module.exports = api;




password = {

  comparePasswords: (userPassword, dbPassword) => {
    console.log('test');
    return bcrypt.compareSync(userPassword, dbPassword);
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
  }
};