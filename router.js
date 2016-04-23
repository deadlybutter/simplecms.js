var app;
var express;

function implementStructurePath(structure) {
  app.get(structure.url_prefix, function(req, res) {
    res.json(structure);
  });
}

module.exports = function(a, e) {
  app = a;
  express = e;
  
  var module = {};

  module.path = implementStructurePath;

  return module;
}
