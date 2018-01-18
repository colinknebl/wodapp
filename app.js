const express        = require('express'),
      app            = express(),
      directoryName  = __dirname.slice(0, __dirname.length - 6),
      path           = require('path'),
      http           = require('http'),
      routes         = require('./routes/routes'),
      api            = require('./api/api'),
      middleware     = require('./middleware/middleware'),
      wodGeneratorV2 = require('./workout_gen_software/wodGeneratorV2');

// MIDDLEWARE
app.use(middleware);

// POINT STATIC PATH TO DIST FOLDER
app.use(express.static(path.join(__dirname, '/public/dist')));



// USER SCHEMA - THIS IS IN MONGOOSE; NEED TO RE-WRITE WITH MONGODB
const validateUser = require('./models/User');
// let user = {
//   name: '4',
//   age: 4,
//   alive: true,
//   dog: undefined
// };
// validateUser.validate(user, 'app.js','2390gasdgab3t');





// INDEX ROUTE
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/dist/index.html'));
});

app.post('/workout-generator/', (req, res) => {

  // validateUser.validate(req.body.user, 'app.js', '23095u23gads53^');
  
  // ADD USER TO THE USER DATABASE
  // mongodb.addUser(user.firstName, user.lastName, user.email);

  wod = wodGeneratorV2.generateWod(req.body);

  wod
    .then(results => {

      console.log('final results',results);
      res.json(results);
    })
    .catch(err => res.json(err) );
});









// REGISTER API AND ROUTES
app.use(api);
app.use(routes);

// GET PORT FROM ENIRONMENT AND STORE IN EXPRESS
const port = process.env.PORT || '4800';
app.set('port', port);

// CREATE HTTP SERVER
const server = http.createServer(app);

// LISTEN ON SPECIFIED PORT FOR NETWORK REQUESTS
server.listen(port, () => {
  console.log(`API running on localhost:${port}`);
});