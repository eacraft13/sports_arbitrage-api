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
        it('should return 400 without data', function(done) {
            request(app)
            .post('/matches')
            .expect('Content-Type', /json/)
            .expect(400, done);
        });

        it('should return 201', function(done) {
            request(app)
            .post('/matches')
            .send({
                sport: 'NFL',
                teams: { away: 'Oakland Raiders', home: 'Denver Broncos' },
                time: 1450002600
            })
            .expect('Content-Type', /json/)
            .expect(201, done);
        });
    });



    describe('@show', function() {
        it('should return 404 with nonexistant match', function(done) {
            request(app)
            .get('/matches/nfl/tenessee-titans/new-england-patriots/1450002600')
            .expect('Content-Type', /json/)
            .expect(404, done);
        });

        it('should return 200', function(done) {
            request(app)
            .get('/matches/nfl/oakland-raiders/denver-broncos/1450002600')
            .expect('Content-Type', /json/)
            .expect(200, done);
        });
    });

});
