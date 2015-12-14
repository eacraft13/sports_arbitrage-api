var config = require('../config');
var r      = require('rethinkdb');



r.connect()
.then(function(conn) {

    // Make sure db board exists
    r.dbCreate(config.rethinkdb.db || 'test').run(conn)

    // Use db board
    .finally(function() {
        return conn.use(config.rethinkdb.db || 'test');
    })

    // Make sure table matches exists
    .finally(function() {
        return r.tableCreate('matches').run(conn);
    })

    // Make sure table lines exists
    .finally(function() {
        return r.tableCreate('lines').run(conn);
    })

    // Make sure index match_id exists on lines table
    .finally(function() {
        return r.table('lines').indexCreate('match_id').run(conn);
    })

    .finally(function() {
        conn.close();
        process.exit();
    });

});
