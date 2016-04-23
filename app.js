var express = require('express');
var app = express();
var exphbs = require('express-handlebars');

// Simple CMS modules
var router = require(__dirname + '/router')(app, express);
var structure = require(__dirname + '/structure');

function startServer(directory) {
  // Parse settings
  if (!directory) {
    directory = __dirname + "/../../";
  }

  // Create page structures
  structure(directory + '/structures');
  structure.parse();
  structure.createPaths(router);

  // Setup application
  app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    partialsDir: [directory + '/views/partials'],
    helpers: {}
  }));
  app.set('view engine', 'handlebars');

  var PORT = process.env.PORT || 5000;
  app.listen(PORT, function () {
    console.info(`simplecms.js listening on port ${PORT}`);
  });
}

module.exports = function() {
  var module = {};

  module.start = startServer;

  return module;
}
