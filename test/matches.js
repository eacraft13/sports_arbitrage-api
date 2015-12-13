var app     = require('../lib/index')(require('./config'));
var request = require('supertest');
var should  = require('chai').should();



describe('matches', function() {

    describe('@index', function() {
        it('should return 200', function(done) {
            request(app)
            .get('/matches')
            .expect('Content-Type', /json/)
            .expect(200, done);
        });

        it('should return an array', function(done) {
            request(app)
            .get('/matches')
            .expect(function(res) {
                res.body.should.be.an('array');
            })
            .end(done);
        });
    });



    describe('@create', function() {
        it('should return 201');
    });

});
