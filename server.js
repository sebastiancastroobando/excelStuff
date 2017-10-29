// SETUP ==============================================================
// express  :
const express           = require('express');
const app               = express();
const exphbs            = require('express-handlebars');
const expressValidator  = require('express-validator');
const session           = require('express-session');

// parsers  :
const bodyParser        = require('body-parser');
const cookieParser      = require('cookie-parser');

// passport :
const passport          = require('passport');
const LocalStrategy     = require('passport-local').Strategy;
var flash               = require('connect-flash');

// database :
const MongoClient       = require('mongodb').MongoClient;
const mongoose          = require('mongoose');

// path     :
var path                = require('path');

//=====================================================================

const url           = 'mongodb://localhost:27017/comp307website';
var db;
mongoose.connect('mongodb://localhost/comp307website',{ useMongoClient: true });

// Connecting to local database @ port 3000
MongoClient.connect(url, (err, database) => {
  if(err) return console.log('Line 33: Can\'t connec to database');
  
  
  console.log("Connection esthablished...");
  db = database;
  app.listen(3000, () => {
      console.log('listening on 3000');
  })
})

var routes = require('./routes/index');
var users = require('./routes/users');


// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'jetfuelcantmeltsteelbeams',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: (param, msg, value) => {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Connect Flash
app.use(flash());

// Global Vars
app.use( (req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});


app.use('/', routes);
app.use('/users', users);
