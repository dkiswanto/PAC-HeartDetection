var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/try-socket', function(req, res, next) {
  res.render('socket-client', { title: 'Express' });
});



module.exports = router;
