function implementStructurePath(structure) {
  app.get(structure.url_prefix, function(req, res) {
    res.json(structure);
  });
}

module.exports = function(app, express) {
  var module = {};

  module.path = implementStructurePath;

  return module;
}
