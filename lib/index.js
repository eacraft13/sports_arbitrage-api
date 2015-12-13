var express = require('express');



module.exports = function(config) {
    var app = express();



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
