const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'student',
    password: 'student',
    database: 'shop'
});

connection.connect((err) => {
    if (err) throw err
});

module.exports = connection;