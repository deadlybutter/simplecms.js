module.exports = function(router, modules) {

  router.get('/', function(req, res) {
    res.render('admin_home', {});
  });

  router.get('/new/structure', function(req, res) {
    res.json(modules.mongoModule.getParsableSchema('structure'));
    // res.render('admin_structure', {});
  });

  router.get('/new/content/', function(req, res) {

  });

  router.get('/new/content/:type', function(req, res) {

  });

}
