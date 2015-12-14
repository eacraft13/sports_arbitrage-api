var r        = require('rethinkdb');
var slug     = require('slug');
var validate = require('ajv')().compile(require('../schemas/lines'));



module.exports = {};

module.exports.index = function(req, res) {
    var id = [ req.params.sport, req.params.team_away, req.params.team_home, +req.params.time ];

    r.table('lines')
    .getAll(id, { index: 'match_id' })
    .run(req.conn)
    .then(function(cursor) {
        return cursor.toArray();
    })
    .then(function(results) {
        res.json(results);
    });
};



module.exports.create = function(req, res) {
    var input = req.body;
    input.match_id = [ req.params.sport, req.params.team_away, req.params.team_home, +req.params.time ];

    var valid = validate(input);
    if (!valid)
        return res.status(400).json(validate.errors);

    r.table('lines')
    .insert(input)
    .run(req.conn)
    .then(function(result) {
        res.status(201).json(result);
    });
};
