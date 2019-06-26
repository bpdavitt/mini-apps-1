const db = require('./db')

module.exports.insertUser = (data, callback) => {
    db.query(`INSERT INTO users (name, email, password) VALUES 
    ("${data.name}", "${data.email}", "${data.password}");`, (err, res) => {
        if (err) {
            console.log('Error while inserting a user ', err);
            callback(err, null);
        } else {
            callback(null, res.insertId);
        }
    });
}