var express = require('express'),
    routes = require('./routes/slash'),
    http = require('http'),
    path = require('path');
var passport = require('passport');
var app = express();

app.configure(function(){
  app.set('views', __dirname + '/views');	// Set the directory for views
  app.set('view engine', 'ejs');	// Set the view engine to EJS
  app.use(express.favicon());	// Return a favicon if requested
  app.use(express.logger('tiny'));	// Log requests to the console.log
  app.use(express.bodyParser());	// Parse the request body into req.body object
  app.use(express.methodOverride()); // Allows you to override HTTP methods on old browsers
  app.use(app.router); // Do the routes defined below
  app.use(express.static(path.join(__dirname, 'public')));	// Process static files
});

app.get('/', function(req, res){
  res.sendfile("./public/index.html");
})

app.get('/groupme', function(req, res){
  res.sendfile("./public/groupme.html");
})
app.get('/venmo', function(req, res){
  res.sendfile("./public/venmo.html");
})



port=3000
app.listen(port);
console.log("Express server listening on port "+port);