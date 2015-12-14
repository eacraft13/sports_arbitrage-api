var app     = require('../lib/index')(require('./config'));
var request = require('supertest');
var should  = require('chai').should();



describe('matches', function() {

    describe('@index', function() {
        it('should return 200', function(done) {
            request(app)
            .get('/matches/nfl/oakland-raiders/denver-broncos/1450002600/lines')
            .expect('Content-Type', /json/)
            .expect(200, done);
        });

        it('should return an array', function(done) {
            request(app)
            .get('/matches/nfl/oakland-raiders/denver-broncos/1450002600/lines')
            .expect(function(res) {
                res.body.should.be.an('array');
            })
            .end(done);
        });
    });



    describe('@create', function() {
        it('should return 400 without data', function(done) {
            request(app)
            .post('/matches/nfl/oakland-raiders/denver-broncos/1450002600/lines')
            .expect('Content-Type', /json/)
            .expect(400, done);
        });

        it('should return 201', function(done) {
            request(app)
            .post('/matches/nfl/oakland-raiders/denver-broncos/1450002600/lines')
            .send({
                source: 'Carbonsports.ag (Covers)',
                odds: { away: { american: 225 }, home: { american: -270 } }
            })
            .expect('Content-Type', /json/)
            .expect(201, done);
        });
    });

});
