const express       = require('express'),
      router        = express.Router(),
      directoryName = __dirname.slice(0, __dirname.length - 6),
      mongodb       = require('../database/database'),
      wodGenerator  = require('../workout_gen_software/wodGenerator');

// mongodb.testConnection();
mongodb.testAtlasConnection();


// USER SCHEMA - THIS IS IN MONGOOSE; NEED TO RE-WRITE WITH MONGODB
// require('../models/User');

// INDEX ROUTE
router.get('/', (req, res) => {
  res.sendFile(directoryName + '/public/dist/index.html');
});



// POST DATA FROM FORM
router.post('/workout-generator/', (req, res) => {

  const user     = new Object({}),
        wodConst = new Object({});

  // BUILD USER OBJECT
  user.firstName = req.body.firstName;
  user.lastName  = req.body.lastName;
  user.email     = req.body.email;
  user.skillLvl  = req.body.skillLvl;
  user.wodType   = req.body.wodType;
  user.muscleGrp = req.body.muscleGrp;
  user.repScheme = req.body.repScheme;
  user.timer     = req.body.wodTimer;
  user.maxBench  = req.body.maxBench;
  user.maxSquat  = req.body.maxSquat;
  user.maxSnatch = req.body.maxSnatch;
  user.maxDead   = req.body.maxDead;
  user.equip     = req.body.equipment;

  // ASSIGN WOD ID
  wodConst._id   = req.body._id + user.firstName[0] + user.lastName[0];

  if (Array.isArray(user.equip) === false) {
    user.equip = [user.equip];
  }

  // ADD USER TO THE USER DATABASE
  mongodb.addUser(user.firstName, user.lastName, user.email);

  wod = wodGenerator.generateWod(user, wodConst);

  wod
    .then((wod) => {
      if (wod) {
        res.send({'result': 'success'});
      } else {
        res.send({'result': 'failure'});
      }
    })
    .catch((err) => {
      console.error(err);
    });
});


// CATCH ALL OTHER ROUTES AND SEND THE INDEX ROUTE
router.get('*', (req, res) => {
  res.sendFile(directoryName + 'public/dist/index.html');
});

module.exports = router;