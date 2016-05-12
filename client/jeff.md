Server side is great!!!! Angular side is basic less robust and follows very little of the john papa conventions

#terminal commands in order
express --git beer-bonuses
npm install --save dotenv pg knex
npm install --save cors
knex init
touch .env
knex migrate:make
knex migtate:latest

bower init
bower install --save angular angular-route

#create Ang App
ng-app/module
two routes
html5mode
express wildcard routes
 maybe layout
home controllwe/template
 show current user name
signup controller/ template
 form/on submit
 http call
  store token
  redirect home page
 handles eroor
  show error


#stuff
add .env to gitignore
√√ 'option + v' √√
Grab jeffs readme


require knex in the routes file to make queries
# Beer: beer-bonuses Install:
```
createdb beer-bonuses
npm install
cp .env.example .env
knex:migrate latest
knex:seed:run

```
'pro-tip - node thefilewithapossiblesyntaxerror'

// √ require knex
  // √ check email, name, and password are all there
  //  √ if not, return an error
  // √ check to see if the email already exists in the db
  //  √ if so, return an error
  // if we're OK
  //  √ hash password
  //  √ knex insert stuff from req.body
  //  create a token
  //  send back id, email, name, token
//});
//
//module.exports = router;
