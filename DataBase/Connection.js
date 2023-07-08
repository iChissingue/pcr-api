const Knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'inaChissingue0.',
        database: 'pcrapi'
    }
})


module.exports = Knex