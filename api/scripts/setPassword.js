const { Client } = require('pg');

const authQueries = require('../queries/authentication.js');

if (process.argv.lenght < 4) {    
    console.error('Missing required arguments: username password');
    queries.close();
} else {
    const pgClient = new Client({
        user: `${process.env.USER}`,
        host: "localhost",
        database: "eit",
        password: "",
        port: process.env.DB_POST || 5432
    });
    pgClient.connect();

    console.log(process.argv[2], process.argv[3]);
    authQueries.setPassword(pgClient, process.argv[2], process.argv[3])
        .then(res => pgClient.end())
        .catch(e => console.log(e.stack));
}
