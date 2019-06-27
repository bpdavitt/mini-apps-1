const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'student',
    password: 'student',
    database: 'connectfour'
});

connection.connect((err) => {
    if (err) throw err
});

const addGame = (gameData, callback) => {
    connection.query(`INSERT INTO games (gameboard, winner)
    values ("${gameData.gameboard}", "${gameData.winner}")`, (err, result) => {
        if (err) {
            console.log(err);
            callback(err);
        } else {
            console.log('Game data successfullin inserted');
            callback(null, result);
        }
    })
}

module.exports = {addGame};