var express = require('express');
var app = express();

var modulesDirectory = __dirname + '/simple_modules/';
var languageController = require(modulesDirectory + 'language')();
var router = require(modulesDirectory + 'router')(app, languageController);

var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.info(`Example app listening on port ${PORT}`);
});
