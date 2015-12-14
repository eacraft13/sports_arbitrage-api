var r        = require('rethinkdb');
var slug     = require('slug');
var validate = require('ajv')().compile(require('../schemas/match'));



module.exports = {};

module.exports.index = function(req, res) {
    r.table('matches')
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

    var valid = validate(req.body);
    if (!valid)
        return res.status(400).json(validate.errors);

    input.id = [
        slug(input.sport).toLowerCase(),
        slug(input.teams.away).toLowerCase(),
        slug(input.teams.home).toLowerCase(),
        input.time
    ];

    r.table('matches')
    .insert(req.body, { conflict: 'replace' })
    .run(req.conn)
    .then(function(result) {
        res.status(201).json(result);
    });
};



module.exports.show = function(req, res) {
    var id = [ req.params.sport, req.params.team_away, req.params.team_home, +req.params.time ];

    r.table('matches')
    .get(id)
    .run(req.conn)
    .then(function(result) {
        if (!result) res.status(404).json(result);
        else res.json(result);
    });
};



module.exports.update = function(req, res) {
    res.status(501).json({ message: 'Not implemented' });
};



module.exports.destroy = function(req, res) {
    res.status(501).json({ message: 'Not implemented' });
};
