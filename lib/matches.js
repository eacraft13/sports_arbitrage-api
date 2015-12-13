module.exports = {};

module.exports.index = function(req, res) {
    res.send('index');
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
