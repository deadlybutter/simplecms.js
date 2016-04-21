var structures = require(__dirname + '/../config/structures');

function getStructures() {
  return structures;
}

module.exports = function() {
  var module = {};

  module.getStructures = getStructures;

  return module;
}
