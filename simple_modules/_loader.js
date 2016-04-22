var modules = {};
var modulesDirectory = __dirname + '/';

function loadMongoModule(finished) {
  require(modulesDirectory + 'mongo')(function(module) {
    modules.mongoModule = module;
    loadLanguageModule(finished);
  });
}

function loadLanguageModule(finished) {
  require(modulesDirectory + 'language')(modules.mongoModule, function(module) {
    modules.languageModule = module;
    loadStructureModule(finished);
  });
}

function loadStructureModule(finished) {
  require(modulesDirectory + 'structure')(modules.mongoModule, function(module) {
    modules.structureModule = module;
    loadRouterModule(finished);
  });
}

function loadRouterModule(finished) {
  require(modulesDirectory + 'router')(
    this.app,
    this.express,
    modules,
    function(module) {
      this.router = module;
      finished();
    }
  );
}

module.exports = function(app, express, done) {
  this.app = app;
  this.express = express;
  loadMongoModule(function finished() {
    done(modules);
  });
}
