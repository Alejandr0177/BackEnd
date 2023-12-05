const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: "8889",
    database: 'clinica',
    multipleStatements: true
})

connection.connect(function(err) {
    if(err) throw err;
    console.log('Connected Database clinica')
})

module.exports = connection;