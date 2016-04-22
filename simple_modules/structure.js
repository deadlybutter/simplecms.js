var db = {};

var structures = {};

function getStructures() {
  return structures;
}

module.exports = function(databaseModule, ready) {
  var module = {};

  module.getStructures = getStructures;

  db = databaseModule;
  db.get('structure', false, {}, function(structs) {
    structures = structs;
    ready(module);
  });
}
