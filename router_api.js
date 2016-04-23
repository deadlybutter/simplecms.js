module.exports = function(router, application) {

  router.get('/yo', function(req, res) {
    res.render('content_edit', {});
  });

}
