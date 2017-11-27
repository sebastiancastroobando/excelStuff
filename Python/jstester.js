var exec = require('child_process').exec, child;
var fs = require('fs');

var user1 = {
    "_id" : "123", 
    "firstname": "Sebastian",
    "lastname": "Castro",
    "password": "qwerty",
    "about": "a latino guy",
    "email": "sebastian@gmail.com",
    "phone": "911",
    "zip": "H3T 1R9"
}

var userlist = [
    {
       "_id" : 111111, 
        "firstname": "Sebastian",
        "lastname": "Castro",
        "password": "qwerty",
        "about": "a latino guy",
        "email": "sebastian@gmail.com",
        "phone": "911",
        "zip": "H3T 1R9"
    }, 
    {
        "_id" : 2 , 
        "firstname": "Sebas",
        "lastname": "Castro",
        "password": "qwerty",
        "about": "a latino guy",
        "email": "sebastian@gmail.com",
        "phone": "911",
        "zip": "H3T 1R9"            
    },
    {
        "_id" : 3 , 
        "firstname": "naitsabes",
        "lastname": "Castro",
        "password": "qwerty",
        "about": "a latino guy",
        "email": "sebastian@gmail.com",
        "phone": "911",
        "zip": "H3T 1R9"            
    },
    {
        "_id" : 4 , 
        "firstname": "DoctorS",
        "lastname": "Castro",
        "password": "qwerty",
        "about": "a latino guy",
        "email": "sebastian@gmail.com",
        "phone": "911",
        "zip": "H3T 1R9"            
    },
    {
        "_id" : 5 , 
        "firstname": "Jeff",
        "lastname": "Castro",
        "password": "qwerty",
        "about": "a latino guy",
        "email": "sebastian@gmail.com",
        "phone": "911",
        "zip": "H3T 1R9"            
    }
]
/*fs.writeFile('in1.json',JSON.stringify(user1),function(err) {
	fs.writeFile('in2.json',JSON.stringify(user2),function(err){
		child = exec('python script.py in1.json in2.json > out.txt',function (err, stdout, stderr){
			console.log("Executing script");
			console.log(stdout);
		});
		//child();
	});
});*/
fs.writeFileSync('in1.json',JSON.stringify(user1))
    fs.writeFileSync('in2.json',JSON.stringify(userlist))

    child = exec('python script.py in1.json in2.json > out.txt',function (err, stdout, stderr){
        console.log("Executing script");
        //console.log(stdout);
        fs.readFile('out.txt',function(err,data){
            var resultId = data;
            console.log(data);
        })
    });


