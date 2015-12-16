var slug     = require('slug');
var validate = require('ajv')().compile(require('../schemas/match'));



module.exports = function(config) {

    var r = require('rethinkdbdash')(config.rethinkdb);

    var index = function(req, res) {
        r.table('matches')
        .run()
        .then(function(results) {
            res.json(results);
        });
    };



    var create = function(req, res) {
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
        .insert(req.body, { conflict: 'replace', returnChanges: true })
        .run()
        .then(function(result) {
            res.status(201).json(result);
        });
    };



    var show = function(req, res) {
        var id = [ req.params.sport, req.params.team_away, req.params.team_home, +req.params.time ];

        r.table('matches')
        .get(id)
        .run()
        .then(function(result) {
            if (!result) res.status(404).json(result);
            else res.json(result);
        });
    };



    var update = function(req, res) {
        res.status(501).json({ message: 'Not implemented' });
    };



    var destroy = function(req, res) {
        res.status(501).json({ message: 'Not implemented' });
    };



    return {
        index: index,
        create: create,
        show: show,
        update: update,
        destroy: destroy
    };

};
