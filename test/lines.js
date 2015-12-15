var _       = require('lodash');
var config  = require('./config');
var moment  = require('moment');
var r       = require('rethinkdb');
var request = require('supertest');
var should  = require('chai').should();

var app     = require('../lib/index')(config);


describe('lines', function() {

    describe('@index', function() {

        before(function(done) {
            r.connect(config.rethinkdb)
            .then(function(conn) {
                conn.use(config.rethinkdb.db);
                r.table('lines').insert({
                    match_id: [ 'nfl', 'oakland-raiders', 'denver-broncos', 1450002600 ],
                    source: 'Carbonsports.ag (Covers)',
                    odds: { away: { american: 225 }, home: { american: -270 } },
                    ttl: 1450002600
                })
                .run(conn)
                .then(function(data) {
                    done();
                });
            });
        });

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

        it('should only return lines with un-expired ttl', function(done) {
            request(app)
            .get('/matches/nfl/oakland-raiders/denver-broncos/1450002600/lines')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                _.each(res.body, function(line) {
                    if (line.ttl < moment().unix())
                        done('Ttl expired for line');
                });
                done();
            });
        });

    });



    describe('@create', function() {

        before(function(done) {
            r.connect(config.rethinkdb)
            .then(function(conn) {
                conn.use(config.rethinkdb.db);
                r.table('matches').insert({
                    id: [ 'nfl', 'oakland-raiders', 'denver-broncos', 1450002600 ],
                    sport: 'NFL',
                    teams: {
                        away: 'Oakland Raiders',
                        home: 'Denver Broncos'
                    },
                    time: 1450002600
                })
                .run(conn)
                .then(function(data) {
                    done();
                });
            });
        });

        it('should return 400 without data', function(done) {
            request(app)
            .post('/matches/nfl/oakland-raiders/denver-broncos/1450002600/lines')
            .expect('Content-Type', /json/)
            .expect(400, done);
        });

        it('should return 404 with non-existant match', function(done) {
            request(app)
            .post('/matches/nfl/los-angeles-raiders/denver-broncos/1450002600/lines')
            .send({
                source: 'Carbonsports.ag (Covers)',
                odds: { away: { american: 225 }, home: { american: -270 } }
            })
            .expect('Content-Type', /json/)
            .expect(404, done);
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
