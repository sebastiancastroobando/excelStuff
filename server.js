// SETUP ==============================================================
// express  :
const express           = require('express');
const app               = express();
///const exphbs            = require('express-handlebars');
///const expressValidator  = require('express-validator');
///const session           = require('express-session');

// parsers  :
const bodyParser        = require('body-parser');
///const cookieParser      = require('cookie-parser');

// passport :
///const passport          = require('passport');
///const LocalStrategy     = require('passport-local').Strategy;
///var flash               = require('connect-flash');

// database :
const MongoClient       = require('mongodb').MongoClient;
///const mongoose          = require('mongoose');

// path     :
var path                = require('path');

//=====================================================================

const url           = 'mongodb://localhost:27017/comp307website';
var db;
///mongoose.connect('mongodb://localhost/comp307website',{ useMongoClient: true });

// Connecting to local database @ port 3000
MongoClient.connect(url, (err, database) => {
  if(err) return console.log('Line 33: Can\'t connect to database');
  
  
  console.log("Connection esthablished...");
  db = database;
  app.listen(3000, () => {
      console.log('listening on 3000');
  })
})

//var routes = require('./routes/index');
//var users = require('./routes/users');


// View Engine
/*app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');*/

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  ///res.render('index');
  console.log("received root request")

  //TODO > Send main page
  res.send("Main Page")

});

app.post('/login', function (req,res ) {
    var user = {
      'name':req.body.name, 
      'password':req.body.password
    }

    //TODO > Send the login page
    res.send("TODO");
});

app.post('/createuser', function (req,res) {
  console.log("Received create user request");
  var newUser = {
    'username':req.body.username,
    'name':req.body.name,
    'password':req.body.password,
    'info':req.body.info
  }
  console.log("Username: "+req.body.username);
  console.log("password: "+newUser.password);
  console.log(req.body);
  db.collection('users').findOne({'username':newUser.username},function(err,result){
    if (err) throw err;
    if(result != null){
      console.log("Tried to create already existing username")
      //TODO > Send some error notification for username already existing
      res.send("Error, username taken");
    }else{
      db.collection('users').insert(newUser, function(err){
        console.log("User created");
        //TODO > Send success notification / redirect
        res.send("Created user")
      });
    }
  })
});

app.get('/getuser', function (req,res) {
  console.log("Received request for user info");
  var username = req.query.username;
  db.collection('users').findOne({'username':username}, function(err, result){
    if(result != null){
      //TODO > Return the user information
      res.send("Username: "+result.username+"\nName: "+result.name);
    }else{
      res.send("No user found");
    }
  });
  
  
});

app.get('/findmatch', function (req,res){
	//TODO (ANTHONY) exec python script

  //Temp, return a random user (actually not random)
  
  db.collection('users').findOne({},function (err, result){
  //db.collection('users').aggregate({$sample: {size:1}},function(err,result){
    if(err) throw err;
    //TODO > return the matched user page
    res.send("User matched: "+result.username);
  });
  
});

app.post('/updateuser', function (req,res){
  console.log("Received request to update user");
  var username = req.body.username;
  var preference = req.body.preference;

  db.collection('users').updateOne({"username":username}, {$set:{'preference':preference}},function (err,res){
    if(err) throw err;
    console.log("preference updated");
    //TODO > send update success
    res.send("Updated user data");
  })
});



// Express Session
/*app.use(session({
    secret: 'jetfuelcantmeltsteelbeams',
    saveUninitialized: true,
    resave: true
}));*/

// Passport init
//app.use(passport.initialize());
//app.use(passport.session());

// Express Validator
/*app.use(expressValidator({
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
}));*/

// Connect Flash
//app.use(flash());

// Global Vars
/*
app.use( (req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});*/

/*
//@ Add databse reference to requests
app.all('*', function( req,res, next){
  request.database = db;
  next();
})*/

//app.use('/', routes);
//app.use('/users', users);


