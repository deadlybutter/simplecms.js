module.exports = function(router, modules) {

  router.get('/', function(req, res) {
    res.render('admin_home', {});
  });

  router.get('/content/new/:type', function(req, res) {

  });

  router.post('/content/save/:type', function(req, res) {

  });

}
