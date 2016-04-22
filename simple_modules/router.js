function setupStructurePath(app, express, structure) {
  var prefix = '/' + structure.url_prefix;

  if (structure.custom_router) {
    var router = express.Router();
    var routerPath = __dirname + '/../routers/' + structure.custom_router;
    var routerModule = require(routerPath)(router, this.modules);
    app.use(prefix, router);
  }
  else {
    app.get(prefix, function(req, res) {
      // do things
      res.send("k");
    });
  }
}

function setupStructurePaths(app, express, structures) {
  Object.keys(structures).forEach(function(key) {
    var structure = structures[key];
    setupStructurePath(app, express, structure);
  });
}

module.exports = function(app, express, modules, ready) {
  this.modules = modules;
  var languageModule = modules.languageModule;
  var structureModule = modules.structureModule;

  app.use(function (req, res, next) {
    var headerLang = req['headers']['accept-language'];
    req['simple_language'] = languageModule.getLanguage(headerLang);
    next();
  });

  var structures = structureModule.getStructures();
  if (structures && structures.length > 0) {
    setupStructurePaths();
  }

  setupStructurePath(app, express, {
    "custom_router": "simple_admin_router",
    "url_prefix": "admin"
  });

  ready(module);
  // res.send(`Hello ${JSON.stringify(req.simple_language)} speaking user!`);
}
