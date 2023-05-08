// Database configuration

const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'exampleHost',
    user: 'exampleUser',
    password: 'examplePassword',
    database: 'exampleDatabase'
});

module.exports = db;