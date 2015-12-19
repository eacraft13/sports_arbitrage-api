var moment   = require('moment');
var r        = require('../bin/r');
var slug     = require('slug');
var validate = require('ajv')().compile(require('../schemas/lines'));



module.exports = function(config) {

    var index = function(req, res) {
        var id = [ req.params.sport, req.params.team_away, req.params.team_home, +req.params.time ];

        r.table('lines')
        .getAll(id, { index: 'match_id' })
        .filter(r.row('ttl').gt(moment().unix()))
        .run()
        .then(function(results) {
            res.json(results);
        });
    };



    var create = function(req, res) {
        var input      = req.body;
        input.match_id = [ req.params.sport, req.params.team_away, req.params.team_home, +req.params.time ];
        input.id       = [ input.source, input.match_id ];

        input.ttl = input.ttl || moment().add(20, 'minutes').unix();
        input.created = r.now();

        var valid = validate(input);
        if (!valid)
            return res.status(400).json(validate.errors);

        r.table('matches')
        .get(input.match_id)
        .run()
        .then(function(result) {
            if (!result)
                res.status(404).json(result);
            else
                r.table('lines')
                .insert(input, { conflict: 'replace', returnChanges: true })
                .run()
                .then(function(result) {
                    res.status(201).json(result);
                });
        });
    };



    return {
        index: index,
        create: create
    };

};
