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

module.exports.insertContact = (data, callback) => {
    db.query(`INSERT INTO contacts (address1, address2, city, state, zip, phone, id_users) 
    VALUES ("${data.address1}", "${data.address2}", "${data.city}", "${data.state}", 
    "${data.zip}", "${data.phone}", "${data.id_users}");`, (err, res) => {
        if (err) {
            console.log('Error while inserting a contact ', err);
            callback(err, null);
        } else {
            callback(null, res.insertId);
        }
    });
}

module.exports.insertBilling = (data, callback) => {
    db.query(`INSERT INTO billing (cardNumber, expiration, cvv, billZip, id_users) 
    VALUES ("${data.cardNumber}", "${data.expiration}", "${data.cvv}", "${data.billZip}", 
    "${data.id_users}");`, (err, res) => {
        if (err) {
            console.log('Error while inserting billingInfo ', err);
            callback(err, null);
        } else {
            callback(null, res.insertId);
        }
    });
}

module.exports.getAll = (record, callback) => {
    db.query(`SELECT a.name, a.email, a.password,
                b.address1, b.address2, b.city, b.state,
                b.zip, b.phone,
                c.cardNumber, c.expiration, c.cvv,
                c.billZip
            FROM users a
                INNER JOIN contacts b
                    ON a.id = b.id_users
                INNER JOIN billing c
                    ON a.id = c.id_users
            WHERE a.id = ${record.id_users}`, (err, res, fields) => {
        if (err) {
            console.log('Error in getting all record data');
            callback(err, null);
        } else {
            callback(null, res);
        }
    })
}