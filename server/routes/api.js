var express = require('express');
var router = express.Router();
var knex = require('../db');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ title: 'Express' });
});


router.post('/signup', function(req, res, next) {
  const errors = []

    if (!req.body.email || !req.body.email.trim()) errors.push("Email can't be blank");
    if (!req.body.name || !req.body.name.trim()) errors.push("Name can't be blank");
    if (!req.body.password || !req.body.password.trim()) errors.push("Password can't be blank");

    if (errors.length) {
      res.status(422).json({
        errors: errors
      })
    }
    else {
      knex('users')
            .whereRaw('lower(email) = ?', req.body.email.toLowerCase())
            .count()
            .first()
            .then(function(count){

              res.json({secret: "stuff", count: count})
            })
    }
});

module.exports = router;
