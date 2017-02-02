var personData = [
    {
        "id": 1,
        "firstName": "Ted",
        "lastName": "Neward",
        "status": "MEANing"
    },
    {
        "id": 2,
        "firstName": "Brian",
        "lastName": "Randell",
        "status": "TFSing"
    }
];

// Load modules
var express = require('express');
var debug = require('debug')('app');
var _ = require('lodash');
var bodyParser = require('body-parser');

// Create express instance
var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));

// Set up a simple route
app.get('/', function (req, res) {
    res.send('Hello World! express');
});

//var setJsonResponse = function(res, status, msg) {
//    res.setHeader('content-type', 'application/json');
//    res.status(status).send(msg);
//}

// adding custom functions to response 
app.use(function (req, res, next) {
    res.setInvalidInput = function () {
        return res.status(400).jsonp({ "message": "Invalid input" });
    };
    res.setError = function (errorMsg) {
        return res.status(400).jsonp({ "message": error});
    };
    res.setJson = function (json) {
        return res.status(200).jsonp(json);
    };

    next();
});


// Get person list
var getAllPersons = function (req, res) {
    var response = personData;
    res.send(JSON.stringify(response));
};
app.get('/persons', getAllPersons);

// get person by id
var getPerson = function (req, res) {
    if (req.person) {
        res.setJson(req.person);
    }
    else {
        res.setError("Unrecognized identifier: " + identifier);
    }
};
app.get('/persons/:personId', getPerson);

// parameter processing
app.param('personId', function (req, res, next, personId) {
    var person = _.find(personData, function (it) {
        return personId == it.id;
    });
    req.person = person;
    next();
});

// delete person
var deletePerson = function (req, res) {
    if (req.person) {
        _.remove(personData, function(it) {
            return it.id === req.person.id;
        });
        res.setJson({ message: "Deleted successfully" });
    } else {
        res.setError("Unrecognized person identifier" + req.person.id);
    }
};

app.delete('/persons/:personId', deletePerson);

// insert a person
var insertPerson = function (req, res) {
    var person = req.body;
    person.id = personData.length + 1;
    personData.push(person);
    res.setJson(person);
};
app.post('/persons', insertPerson);

// update a person 
var updatePerson = function (req, res) {
    if (req.person) {
        var originalPerson = req.person;
        var incomingPerson = req.body;
        var newPerson = _.merge(originalPerson, incomingPerson);
        res.setJson(newPerson);
    }
    else {
        res.setError("Unrecognized person identifier");
    }
};
app.put('/persons/:personId', updatePerson);


// Start the server
var port = process.env.PORT || 3000;
debug("We picked up", port, "for the port");
var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});