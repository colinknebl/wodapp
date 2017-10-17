// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Get our API routes
// const api = require('./server/routes/api');

const app = express();

// Parsers for POST data
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
// app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  console.log(__dirname);
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '4000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));




























// const express = require('express');

// const app = express();

// app.use(express.static(path.join(__dirname, './public/dist')));

// // Index Route
// app.get('/', (req, res) => {
//   // res.render('/Users/colinknebl/Documents/web_development/Lipsum Labs/wodapp/public/src/index.html');
//   res.render('public/dist/index.html');
// });

// // About Route
// app.get('/about', (req, res) => {
//   res.send('ABOUT');
// });

// const port = 5000;

// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });