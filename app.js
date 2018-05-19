const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const prompt = require('prompt-promise');
const pgp = require('pg-promise')({});
const db = pgp({database: 'todo_app', user: 'postgres'});
const body_parser = require('body-parser');
app.use(body_parser.urlencoded({extended: false}));


nunjucks.configure('views', {
  autoescape: true,
  express: app,
  noCache: true
});

app.get('/', function(request, response) {
  
    response.send('This is a super duper ToDo app! Go to url/todos to view the list.');
});

app.get('/todos', function(request, response){
  db.query('SELECT description FROM task WHERE done = false')
  .then(function(tasks) {
    tasks.forEach(function(r){
      //console.log(r);
      return r.description;
    });
    
    //console.log(tasks);
    var context = {tasks: tasks};
    response.render('list.html',context);
  });
});

app.get('/todos/add', function(request, response){
  db.query('SELECT description FROM task WHERE done = false')
  .then(function(tasks) {
    tasks.forEach(function(r){
      //console.log(r);
      return r.description;
    });
    
    //console.log(tasks);
    var context = {tasks: tasks};
    response.render('form.html',context);
  });
});

app.post('/submit', function(request, response) {
  var input = request.body.task;
  var q = "INSERT INTO task VALUES (default,$1, false)"
  console.log(typeof(input));
  db.result(q, input)
  .then(function(result) {
    //console.log(result);
    });
  response.redirect('/todos/add');
});

app.get('/todos/done/:id', function (request, response) {
    var id = {id: request.params.id};
    console.log(id);
    var query = "UPDATE task SET done = true WHERE id = ${id}";
    db.result(query, id)
    .then(function(result) {
      console.log(result);
    });
    response.redirect('/todos/add');
});


app.listen(8000, function () {
    console.log('Listening on port 8000');
});