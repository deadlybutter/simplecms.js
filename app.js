var express = require('express');
var app = express();

var languageController = require(__dirname + '/language_controller')();
var router = require(__dirname + '/router')(app, languageController);

var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  console.info(`Example app listening on port ${PORT}`);
});
