var config = process.env.NODE_ENV === 'test' ? require('../test/config') : require('../config');
var r      = require('rethinkdb');



r.connect()
.then(function(conn) {

    if (process.env.NODE_ENV !== 'test')
        throw new Error('You are about to drop a non-test a database!');

    // Drop the database
    r.dbDrop(config.rethinkdb.db).run(conn)

    .finally(function() {
        conn.close();
        process.exit();
    });

});
