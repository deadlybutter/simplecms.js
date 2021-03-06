var app;
var express;

function implementStructurePath(structure) {
  app.get(structure.url_prefix, function(req, res) {
    res.render(structure.template, {});
  });
}

function customRouter(path, router_module, application) {
  var router = express.Router();
  router_module(router);
  app.use(path, router);
}

module.exports = function(a, e) {
  app = a;
  express = e;

  var module = {};

  module.path = implementStructurePath;
  module.customRouter = customRouter;

  return module;
}
