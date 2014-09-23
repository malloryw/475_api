var express = require('express'),
    routes = require('./routes/slash'),
    http = require('http'),
    path = require('path');
var passport = require('passport');
var VenmoStrategy = require('passport-venmo').Strategy;
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

var Venmo_Client_ID = "1984";
var Venmo_Client_SECRET = 'ujK9d5ADHTtsAcVRYJxLENGsaGxVnku3';
var Venmo_Callback_URL = 'http://localhost:3000/venmo';

passport.use(new VenmoStrategy({
    clientID: Venmo_Client_ID,
    clientSecret: Venmo_Client_SECRET,
    callbackURL: Venmo_Callback_URL
  },
  function(accessToken, refreshToken, venmo, done) {
    User.findOne({
        'venmo.id': venmo.id
    }, function(err, user) {
        if (err) {
            return done(err);
        }
        // checks if the user has been already been created, if not
        // we create a new instance of the User model
        if (!user) {
            user = new User({
                name: venmo.displayName,
                username: venmo.username,
                email: venmo.email,
                provider: 'venmo',
                venmo: venmo._json,
                balance: venmo.balance,
                access_token: accessToken,
                refresh_token: refreshToken
            });
            user.save(function(err) {
                if (err) console.log(err);
                return done(err, user);
            });
        } else {
            user.balance = venmo.balance;
            user.access_token = accessToken;
            user.save();
            user.venmo = venmo._json
            return done(err, user);
        }
    });
  }
));


port=3000
app.listen(port);
console.log("Express server listening on port "+port);