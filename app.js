var express = require('express');
var app = express();

var modulesDirectory = __dirname + '/simple_modules/';

var languageController = require(modulesDirectory + 'language')();
var structureController = require(modulesDirectory + 'structure')();
var router = require(modulesDirectory + 'router')(app, express, languageController, structureController);

var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.info(`simplecms.js listening on port ${PORT}`);
});
