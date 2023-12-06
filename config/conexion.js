const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    port: "8889",
    database: 'clinica',
    multipleStatements: true
})

connection.connect(function(err, result) {
    if(err) throw err;
    console.log(`Mysql: \n\tConnection with ${connection.config['database']} database successful`)
})

module.exports = connection;