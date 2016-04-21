module.exports = function(app, express, languageController, structureController) {

  app.use(function (req, res, next) {
    var headerLang = req['headers']['accept-language'];
    req['simple_language'] = languageController.getLanguage(headerLang);
    next();
  });

  var structures = structureController.getStructures();
  Object.keys(structures).forEach(function(key) {
    var structure = structures[key];
    var prefix = '/' + structure.url_prefix;

    if (structure.custom_router) {
      var router = express.Router();
      var routerPath = __dirname + '/../routers/' + structure.custom_router;console.log(routerPath);
      var routerModule = require(routerPath)(router);
      app.use(prefix, router);
    }
    else {
      app.get(prefix, function(req, res) {
        // do things
        res.send("k");
      });
    }
  });

  // app.get('/', function (req, res) {
  //   res.send(`Hello ${JSON.stringify(req.simple_language)} speaking user!`);
  // });

}
