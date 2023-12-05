const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: 'clinica',
    multipleStatements: true
})

connection.connect(function(err) {
    if(err) throw err;
    console.log('Connected Database clinica')
})

module.exports = connection;