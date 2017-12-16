const express       = require('express'),
      app           = express(),
      bodyParser    = require('body-parser'),
      cors          = require('cors');

// PARSING POST DATA
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CROSS-ORIGIN RESOURCE SHARING
app.use(cors());

module.exports = app;