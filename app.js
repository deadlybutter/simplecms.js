var express = require('express');
var app = express();
var exphbs = require('express-handlebars');

// Simple CMS modules
var routerModule = require(__dirname + '/router')(app, express);
var structureModule = require(__dirname + '/structures')();

function startServer(directory) {
  // Parse settings
  if (!directory) {
    directory = __dirname + "/../../";
  }

  // Create page structures
  structureModule.parse(directory + '/structures');
  structureModule.createPaths(routerModule);

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
