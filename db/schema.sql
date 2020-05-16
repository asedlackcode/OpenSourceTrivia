/*
This file is intended to help developers get their SQL Databases setup correctly.
It is important since other developers will be unlikely to have the same database or tables setup already.
*/

/* Create and use the starwars db */
DROP DATABASE IF EXISTS `trivia_db`;
CREATE DATABASE `trivia_db`;
USE `trivia_db`;


/* Create a table for the users high scores */
CREATE TABLE `high_scores` (
	`id` Int( 11 ) AUTO_INCREMENT NOT NULL,
	`userName` VARCHAR( 255) NOT NULL,
	`userScore` VARCHAR( 255 ) NOT NULL,
	`created_at` DATETIME NOT NULL,
	/* Set ID as primary key */
	PRIMARY KEY ( `id` )
);

/* Create a table for the users question */
CREATE TABLE `user_question` (
	`id` Int( 11 ) AUTO_INCREMENT NOT NULL,
	`userName` VARCHAR( 255) NOT NULL,
	`userQuestion` VARCHAR( 255 ) NOT NULL,
	`created_at` DATETIME NOT NULL,

	PRIMARY KEY ( `id` )
);

CREATE TABLE `login` (
	`id` Int( 11 ) AUTO_INCREMENT NOT NULL,
	'name' VARCHAR( 255) NOT NULL,
	'password' VARCHAR( 255 ) NOT NULL,
	PRIMARY KEY (`id`)
);