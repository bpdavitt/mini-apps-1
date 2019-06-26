DROP DATABASE IF EXISTS shop;

CREATE DATABASE shop;

USE shop;

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL DEFAULT 'guest',
    `email` VARCHAR(30) NOT NULL,
    `password` VARCHAR(30) NOT NULL DEFAULT '',
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `contacts`;

CREATE TABLE `contacts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `address1` VARCHAR(30) NOT NULL,
    `address2` VARCHAR(30),
    `city` VARCHAR(30) NOT NULL,
    `state` VARCHAR(30) NOT NULL,
    `zip` INTEGER NOT NULL,
    `phone` VARCHAR(30) NOT NULL DEFAULT '',
    `id_users` INTEGER NOT NULL,
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `billing`;

CREATE TABLE `billing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cardNumber` INTEGER NOT NULL,
    `expiration` VARCHAR(30) NOT NULL,
    `cvv` INTEGER NOT NULL,
    `billZip` INTEGER NOT NULL,
    `id_users` INTEGER NOT NULL,
    PRIMARY KEY (`id`)
);

ALTER TABLE `contacts` ADD FOREIGN KEY (id_users) REFERENCES `users` (`id`);
ALTER TABLE `billing` ADD FOREIGN KEY (id_users) REFERENCES `users` (`id`);




/*  Execute this file from the command line by typing:
 *    mysql -u student < server/schema.sql
 *  to create the database and the tables.*/

-- FOLLOWING is an example 

--  SELECT a.name, a.email, a.password,
--     b.address1, b.address2, b.city, b.state,
--     b.zip, b.phone,
--     c.cardNumber, c.expiration, c.cvv,
--     c.billZip
-- FROM users a
--     INNER JOIN contacts b
--         ON a.id = b.id_users
--     INNER JOIN billing c
--         ON a.id = c.id_users
-- WHERE a.id = 1  ******** replace 1 with whatever your target user is