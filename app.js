const express       = require('express'),
      app           = express(),
      path          = require('path'),
      http          = require('http'),
      routes        = require('./routes/routes'),
      api           = require('./api/api'),
      middleware    = require('./middleware/middleware');

// MIDDLEWARE
app.use(middleware);

// POINT STATIC PATH TO DIST FOLDER
app.use(express.static(path.join(__dirname, '/public/dist')));

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