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
    debug("/ requested");
    res.send('Hello World! express');
});

// Get person list
var getAllPersons = function (req, res) {
    debug("getAllPersons Called:");
    var response = personData;
    res.send(JSON.stringify(response));
};
app.get('/persons', getAllPersons);

// get person by id
var getPerson = function (req, res) {
    debug("getPersonCalled:", req.person);
    if (req.person) {
        res.send(200, JSON.stringify(req.person));
    }
    else {
        res.send(400, { message: "Unrecognized identifier: " + identifier });
    }
};
app.get('/persons/:personId', getPerson);

// parameter processing
app.param('personId', function (req, res, next, personId) {
    debug("personId found:", personId);
    var person = _.find(personData, function (it) {
        return personId == it.id;
    });
    debug("person:", person);
    req.person = person;
    next();
});

// delete person
var deletePerson = function (req, res) {
    if (req.person) {
        debug("Removing", req.person.firstName, req.person.lastName);
        _.remove(personData, function (it) {
            return it.id === req.person.id;
        });
        debug("personData=", personData);
        var response = { message: "Deleted successfully" };
        res.status(200).jsonp(response);
    }
    else {
        var response = { message: "Unrecognized person identifier" };
        res.status(404).jsonp(response);
    }
};

app.delete('/persons/:personId', deletePerson);

// insert a person
var insertPerson = function (req, res) {
    var person = req.body;
    debug("Received", JSON.stringify(req.body));
    person.id = personData.length + 1;
    personData.push(person);
    res.status(200).jsonp(person);
};
app.post('/persons', insertPerson);

// update a person 
var updatePerson = function (req, res) {
    if (req.person) {
        var originalPerson = req.person;
        var incomingPerson = req.body;
        var newPerson = _.merge(originalPerson, incomingPerson);
        res.status(200).jsonp(newPerson);
    }
    else {
        res.status(404).jsonp({ message: "Unrecognized person identifier" });
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