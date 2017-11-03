// Get dependencies
const express = require('express'),
      app = express();
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');


const mongodb = require('./database/database');
const generator = require('./workout_gen_software/generator');
const wodGenerator = require('./workout_gen_software/wodGenerator');


// Get our API routes
// const api = require('./server/routes/api');


// Test MongoDB connection
mongodb.exerciseConnect();
mongodb.userConnect();

// Middleware for Parsing POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// USER SCHEMA
require('./models/User');


// ROUTING
// Point static path to dist
app.use(express.static(path.join(__dirname, '/public/dist')));

// index route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/dist/index.html'));
});



// POST DATA FROM FORM
app.post('/workout-generator', (req, res) => {
  let userFirstName = req.body.firstName,
        userLastName = req.body.lastName,
        userEmail = req.body.email,
        userSkillLvl = req.body.skillLvl,
        userWodType = req.body.wodType,
        userMuscleGrp = req.body.muscleGrp,
        userRepScheme = req.body.repScheme,
        userTimer = req.body.wodTimer,
        userMaxBench = req.body.maxBench,
        userMaxSquat = req.body.maxSquat,
        userMaxSnatch = req.body.maxSnatch,
        userMaxDead = req.body.maxDead,
        userEquip = req.body.equipment;

  if (Array.isArray(userEquip) === false) {
    userEquip = [userEquip];
  }

  // console.log(req.body);

  // console.log(`First Name: ${userFirstName}`);
  // console.log(`Last Name: ${userLastName}`);
  // console.log(`Email: ${userEmail}`);
  // console.log(`Skill Level: ${userSkillLvl}`);
  // console.log(`Rep Scheme: ${userRepScheme}`);
  // console.log(`WOD Type: ${userWodType}`);
  // console.log(`WOD Timer: ${userTimer}`);
  // console.log(`Muscle Group: ${userMuscleGrp}`);
  // console.log(`Max Bench: ${userMaxBench}`);
  // console.log(`Max Squat: ${userMaxSquat}`);
  // console.log(`Max Snatch: ${userMaxSnatch}`);
  // console.log(`Max Deadlift: ${userMaxDead}`);
  console.log(`Available Equipment: ${userEquip}`);


  // mongodb.addUser(userFirstName, userLastName, userEmail);

  wodGenerator.generateWod(
    userSkillLvl,
    userWodType,
    userMuscleGrp,
    userRepScheme,
    userTimer,
    userMaxBench,
    userMaxSquat,
    userMaxSnatch,
    userMaxDead,
    userEquip
  );
  

  // console.log(mongodb.exercises);

  res.sendFile(path.join(__dirname, '/public/dist/index.html'));
});



// Catch all other routes and return the INDEX file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/dist/index.html'));
});
/**
  * END ROUTING
  */






/**
  * Get port from environment and store in Express.
  */
const port = process.env.PORT || '4800';
app.set('port', port);

/**
  * Create HTTP server.
  */
const server = http.createServer(app);

/**
  * Listen on provided port, on all network interfaces.
  */
server.listen(port, () => console.log(`API running on localhost:${port}`));
