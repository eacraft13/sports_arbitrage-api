var bodyParser = require('body-parser');
var express    = require('express');
var r          = require('rethinkdb');



module.exports = function(config) {
    var app = express();
    app.use(bodyParser.json());



    // Rethinkdb connection
    app.use(function(req, res, next) {
        r.connect(config.rethinkdb || {}, function(err, conn) {
            req.conn = conn;
            next();
        });
    });



    // Matches resource
    var matches = require('./matches');
    app
       .get('/matches',                                    matches.index)
      .post('/matches',                                    matches.create)
       .get('/matches/:sport/:team_away/:team_home/:time', matches.show)
     .patch('/matches/:sport/:team_away/:team_home/:time', matches.update)
    .delete('/matches/:sport/:team_away/:team_home/:time', matches.destroy);



    // Lines resource
    var lines   = require('./lines');
    app
     .get('/matches/:sport/:team_away/:team_home/:time/lines', lines.index)
    .post('/matches/:sport/:team_away/:team_home/:time/lines', lines.create);



    return app;
};
