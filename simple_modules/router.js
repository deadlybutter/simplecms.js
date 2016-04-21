module.exports = function(app, languageController) {

  app.use(function (req, res, next) {
    var headerLang = req['headers']['accept-language'];
    req['simple_language'] = languageController.getLanguage(headerLang);
    next();
  });

  app.get('/', function (req, res) {
    res.send(`Hello ${JSON.stringify(req.simple_language)} speaking user!`);
  });

}
