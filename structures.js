var fs = require('fs');
var structures = [];

function parseStructures(structureDirectory) {
  var files = fs.readdirSync(structureDirectory);
  files.forEach(function(file) {
    if (file.endsWith('.json')) {
      structures.push(require(structureDirectory + '/' + file));
    }
  });
}

function createStructurePaths(router) {
  structures.forEach(function(structure) {
    router.path(structure);
  });
}

function getStructures() {
    return structures;
}

module.exports = function() {
  var module = {};

  module.parse = parseStructures;
  module.createPaths = createStructurePaths;
  module.get = getStructures;

  return module;
}
