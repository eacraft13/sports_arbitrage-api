var bodyParser = require('body-parser');
var express    = require('express');



module.exports = function(config) {
    var app = express();
    app.use(bodyParser.json());



    // Matches resource
    var matches = require('./matches')(config);
    app
       .get('/matches',                                    matches.index)
      .post('/matches',                                    matches.create)
       .get('/matches/:sport/:team_away/:team_home/:time', matches.show)
     .patch('/matches/:sport/:team_away/:team_home/:time', matches.update)
    .delete('/matches/:sport/:team_away/:team_home/:time', matches.destroy);



    // Lines resource
    var lines   = require('./lines')(config);
    app
     .get('/matches/:sport/:team_away/:team_home/:time/lines', lines.index)
    .post('/matches/:sport/:team_away/:team_home/:time/lines', lines.create);



    return app;
};
