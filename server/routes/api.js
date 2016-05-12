const express = require('express');
const router = express.Router();
const knex = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
/* GET home page. */
router.get('/me', function(req, res, next) {
console.log(req.headers.authorization);
if(req.headers.authorization){
  const token = req.headers.authorization.split(' ')[1];
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  knex('users').where({id: payload.id}).first().then(function(user){
    if(user){
      res.json({id: user.id, name: user.name})
    }
    else {
      res.status(403).json({
        error: "Invalid Id"
      })
    }
  })
} else {
  res.status(403).json({ error: 'No Token' });

}

});


router.post('/signup', function(req, res, next) {
  console.log("req like please show up");
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
            .then(function(result){
              if(result.count === "0"){
                const saltRounds = 4
                const passwordHash = bcrypt.hashSync(req.body.password, saltRounds);
                knex('users').insert({
                  email: req.body.email,
                  name: req.body.name,
                  password_hash: passwordHash
                })
                .returning('*')
                .then(function(users) {
                  const user = users[0];
                  const token = jwt.sign({ id: user.id}, process.env.JWT_SECRET);
                  res.json({name: user.name, email: user.email, id: user.id, token: token})
                })
              }
              else {
                res.status(422).json({
                  errors: ["Email has already been takin"]
              })
              }
            })
    }
});

module.exports = router;
