var express = require('express');
var app = express();


const bodyParser = require('body-parser');
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
var path = require('path');
const url = 'mongodb://localhost:27017/comp307website';
var db;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + './../../')); //serves the index.html

MongoClient.connect(url, (err, database) => {
    if (err) return console.log('Can\'t connect to database');


    console.log("Connection esthablished...");
    db = database;
    app.listen(3000, () => {
        console.log('listening on 3000');
    })
})


// Root is served statically
/*app.get('/', (req, res) => {
    ///res.render('index');
    console.log("received root request")
    //TODO > Send main page
    res.send("Main Page")
  });*/

app.post('/login', function (req, res) {
    var user = {
        'username': req.body.username,
        'password': req.body.password
    }
    db.collection('users').findOne({ 'username': user.username, 'password': user.password }, function (err, result) {
        if (err || result == null) {
            res.status(500).send("Error: login failed");
        } else {
            res.status(200).send(result["_id"]);
        }
    })
});

app.post('/createuser', function (req, res) {
    console.log("Received create user request");
    try{
        var newUser = {
            'username': req.body.username,
            'firstname': req.body.firstname,
            'lastname': req.body.lastname,
            'password': req.body.password
        }
    }catch(err){
        console.log("Error while parsing body");
        res.status(500).send("Error while parsing body");
        return;
    }


    db.collection('users').findOne({ 'username': newUser.username }, function (err, result) {
        if (err) {
            res.status(500).send("Error while processing request");
        }
        else if (result != null) {
            console.log("Tried to create already existing username")
            res.status(409).send("Error, username taken");
        } else {
            db.collection('users').insert(newUser, function (err, result) {
                console.log("User created");
                console.log(newUser._id);
                res.status(200).send(newUser._id);
            });
        }
    })
});

app.get('/getuser', function (req, res) {
    console.log("Received request for user info");

    try{
        var id = new mongo.ObjectID(req.query.userid);
        console.log("Query for id: "+id);
    }catch(err){
        console.log("Error while parsing body");
        res.status(500).send("Error while parsing body");
        return;
    }

    db.collection('users').findOne({ '_id': id }, function (err, result) {
        if (err) {
            res.status(500).send("Error while processing request");
        }
        else if (result != null) {
            res.status(200).send(result);
        } else {
            res.status(404).send("No user found");
        }
    });


});

app.get('/findmatch', function (req, res) {
    //TODO (ANTHONY) exec python script

    //Temp, return a random user (actually not random)

    db.collection('users').findOne({}, function (err, result) {
        if (err) {
            res.status(500).send("Error while processing request");
            console.log(err);
        }
        try{
            var id = new mongo.ObjectID(result["_id"]);
            console.log("Query for id: "+id);
        }catch(err){
            console.log("Error while parsing body");
            res.status(500).send("Error while parsing body");
            return;
        }
        db.collection('users').findOne({ '_id': id }, function (err, result) {
            if (err) {
                res.status(500).send("Error while processing request");
            }
            else if (result != null) {
                res.status(200).send(result);
            } else {
                res.status(404).send("No user found");
            }
        });

    });

});

app.post('/updateuser', function (req, res) {
    console.log("Received request to update user");
    try{
        var id = new mongo.ObjectID(req.body.userid);
        console.log("Update id : "+id);
        var update = {
            'firstname': req.body.firstname,
            'lastname': req.body.lastname,
            'password': req.body.password,
            'about': req.body.about,
            'email': req.body.email,
            'phone': req.body.phone,
            'zip': req.body.zip,
	        'hobby': req.body.hobby
        }
    }catch(err){
        console.log("Error while parsing body");
        res.status(500).send("Error while parsing body");
        return;
    }

    var setquery = {
        'firstname': update.firstname,
        'lastname': update.lastname,
        'about': update.about,
        'email': update.email,
        'phone': update.phone,
        'zip': update.zip,
        'hobby': update.hobby
    }
    if(update.password != undefined){
        setquery.password = update.password;
    }

    db.collection('users').updateOne({ "_id": id }, {
        $set: setquery
    }, function (err, result) {
        //console.log(result);
        var updateCount = result.result.nModified;
        var foundCount = result.result.n;
        console.log("Updated "+updateCount+" Documents");
        console.log(result.result);
        if (err ) {
            console.log(err);

            res.status(500).send("Error while processing request");
        }else if (foundCount != 1){
            res.status(404).send("Unable to find user to update");
        }else if (updateCount != 1){
            res.status(200).send("Nothing to update");
        }else{
            console.log("preference updated");
            res.sendStatus(200);
        }

    })
});

app.get('/gethobbies', function (req, res) {
    var hobbies = [
        "Sport",
        "Video Games",
        "Cinema",
        "Reading",
        "Dance",
        "Music",
        "Camping"
    ]
    res.send(hobbies);
})
