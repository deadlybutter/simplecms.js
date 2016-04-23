var express = require('express');
var app = express();
var exphbs = require('express-handlebars');

function startServer(directory) {
  if (!directory) {
    directory = __dirname + "/../../";
  }

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
