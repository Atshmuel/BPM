create database `bpm`;
use `bpm`;

CREATE TABLE IF NOT EXISTS `users` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`full_name` varchar(255) NOT NULL,
	PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `measures` (
	`id` int AUTO_INCREMENT NOT NULL UNIQUE,
	`user_id` int NOT NULL,
	`date` date NOT NULL,
	`syst_high` int NOT NULL,
	`dias_low` int NOT NULL,
	`pulse` int NOT NULL,
	PRIMARY KEY (`id`)
);

ALTER TABLE `measures` ADD CONSTRAINT `measures_fk1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`);




