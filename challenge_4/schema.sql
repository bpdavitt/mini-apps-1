DROP DATABASE IF EXISTS connectfour;

CREATE DATABASE connectfour;

USE connectfour;

DROP TABLE IF EXISTS `games`;

CREATE TABLE `games` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gameboard` VARCHAR(50) NOT NULL,
    `winner` VARCHAR(30) NOT NULL,
    PRIMARY KEY (`id`)
);

/*  Execute this file from the command line by typing:
 *    mysql -u student <schema.sql
 *  to create the database and the tables.*/