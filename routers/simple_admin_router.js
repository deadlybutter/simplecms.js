module.exports = function(router) {

  router.get('/hi', function(req, res) {
    res.send("Yes");
  });
}
