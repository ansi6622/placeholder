var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ title: 'Express' });
});
router.post('/signup', function(req, res, next) {
  res.json({ title: 'respond plzzz' });
});

module.exports = router;
