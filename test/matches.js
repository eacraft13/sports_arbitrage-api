var app     = require('../lib/index')(require('./config'));
var request = require('supertest');



describe('matches', function() {

    describe('@index', function() {
        it('should return 200', function(done) {
            request(app)
            .get('/matches')
            .expect(200, done);
        });

        it('should return an array');
    });



    describe('@create', function() {
        it('should return 201');
    });

});
