require("../app.js");
var supertest = require('supertest');
var debug = require('debug')('app');
var should = require('should');
var request = supertest("http://localhost:3000");
describe('/person tests', function () {
    it('should return Ted for id 1', function (done) {
        request
            .get('/persons/1')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(function (res) {
                res.body.id.should.equal(1)
                res.body.firstName.should.equal("Ted")
                res.body.lastName.should.equal("Neward")
                res.body.status.should.equal("MEANing")
            })
        .end(done);
    });
});

describe('/Add person tests', function () {
    it('should allow me to add a person', function(done) {
        request
            .post('/persons')
            .type('form')
            .set('accept', 'application/json')
            .send({ 'firstName': 'Ted', 'lastName': 'Pattison', 'status': 'SharePointing' })
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(function (res) {
                should.exist(res.body.id);
                res.body.firstName.should.equal("Ted");
                res.body.lastName.should.equal("Pattison");
            })
            .end(done);
    });
});

describe('/Update person tests', function () {
    it('should allow me to update a person', function (done) {
        request
            .put('/persons/2')
            .type('form')
            .set('accept', 'application/json')
            .send({ 'firstName': 'Roger', 'lastName': 'Federer', 'status': 'Winning' })
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(function (res) {
                should.exist(res.body.id);
                res.body.firstName.should.equal("Roger");
                res.body.lastName.should.equal("Federer");
            })
            .end(done);
    });
});

//describe('/Delete person tests', function () {
//    it('should allow me to update a person', function (done) {
//        request
//            .delete('/persons/1')
//            .expect(200)
//            .expect('Content-Type', /json/)
//            .expect(function (res) {
//                res.body.Message.should.equal("Deleted successfully");
//            })
//            .end(done);
//    });
//});
