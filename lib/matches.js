var r = require('rethinkdb');



module.exports = {};

module.exports.index = function(req, res) {
    r
    .table('matches')
    .run(req.conn)
    .then(function(cursor) {
        return cursor.toArray();
    })
    .then(function(results) {
        res.json(results);
    });
};

module.exports.create = function(req, res) {
    res.send('create');
};

module.exports.show = function(req, res) {
    res.send('show');
};

module.exports.update = function(req, res) {
    res.send('update');
};

module.exports.destroy = function(req, res) {
    res.send('destroy');
};
