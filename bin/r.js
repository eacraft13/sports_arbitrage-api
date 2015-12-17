var config = require('../config');

module.exports = require('rethinkdbdash')(config.rethinkdb);
