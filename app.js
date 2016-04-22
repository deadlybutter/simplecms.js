var express = require('express');
var app = express();

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  partialsDir: [__dirname + '/views/partials'],
  helpers: {}
}));
app.set('view engine', 'handlebars');

function startServer() {
  var PORT = process.env.PORT || 5000;
  app.listen(PORT, function () {
    console.info(`simplecms.js listening on port ${PORT}`);
  });
}

this.modules = {};
require(__dirname + '/simple_modules/_loader')(app, express, function modulesLoaded(mods) {
  this.modules = mods;
  startServer();
})

/*
 * structure (page structure). entire HTML page (in the body) + scripts + styles. Also the path prefix.
 * define variables to be used in the HTML that can be replaced when creating content.
 *
 * content. container for all of the ^ variables in each defined language, plus path name and other shit.
 */
