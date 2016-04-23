var express = require('express');
var app = express();
var exphbs = require('express-handlebars');

// Simple CMS modules
var routerModule = require(__dirname + '/router')(app, express);
var structureModule = require(__dirname + '/structures')();

var application = {};

function startServer(directory) {
  // Parse settings
  if (!directory) {
    directory = __dirname + "/../..";
  }

  // Create page structures
  structureModule.parse(directory + '/structures');
  structureModule.createPaths(routerModule);

  // Setup templating
  app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    partialsDir: [directory + '/views/partials'],
    helpers: {}
  }));
  app.set('view engine', 'handlebars');
  app.set('views', [directory + '/views', __dirname + '/views']);

  // Setup admin router
  routerModule.customRouter('/admin', require(__dirname + '/router_admin'), application);

  // Start server
  var PORT = process.env.PORT || 5000;
  app.listen(PORT, function () {
    console.info(`simplecms.js listening on port ${PORT}`);
  });
}

module.exports = function() {
  application.start = startServer;

  return application;
}
