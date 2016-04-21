var express = require('express');
var app = express();

var modulesDirectory = __dirname + '/simple_modules/';

var db = require(modulesDirectory + 'mongo')();
var language = require(modulesDirectory + 'language')();
var structure = require(modulesDirectory + 'structure')();
var router = require(modulesDirectory + 'router')(app, express, language, structure);

var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.info(`simplecms.js listening on port ${PORT}`);
});
