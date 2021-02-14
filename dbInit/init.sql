/* Create database */
CREATE DATABASE IF NOT EXISTS `prog2053-proj`;

/* Set active database */
USE `prog2053-proj`;

/* Create tables */
CREATE TABLE `users` (
  `uid` BIGINT(8) NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(16) NOT NULL,
  `email` VARCHAR(128) NOT NULL,
  `password` VARCHAR(128) NOT NULL,
  `userType` ENUM('admin', 'moderator', 'user') DEFAULT 'user' NOT NULL,
  `picture` LONGBLOB DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE = InnoDB CHARSET = utf8 COLLATE utf8_bin;

CREATE TABLE `requests` (
  `uid` BIGINT(8) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(128) NOT NULL,
  `text` VARCHAR(128) NOT NULL,
  PRIMARY KEY (`uid`),
  FOREIGN KEY (`uid`) REFERENCES users(`uid`)
) ENGINE = InnoDB CHARSET = utf8 COLLATE utf8_bin;

CREATE TABLE `categories` (
  `catid` BIGINT(8) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(256),
  `description` VARCHAR(512),
  PRIMARY KEY (`catid`)
) ENGINE = InnoDB CHARSET = utf8 COLLATE utf8_bin;

CREATE TABLE `posts` (
  `pid` BIGINT(8) NOT NULL AUTO_INCREMENT,
  `catid` BIGINT(8) NOT NULL,
  `user` BIGINT(8) NOT NULL,
  `title` VARCHAR(200) NOT NULL, 
  `content` VARCHAR(20000) NOT NULL,
  `blockStatus` SMALLINT(8) DEFAULT '0',
  `date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`pid`),
  FOREIGN KEY (`catid`) REFERENCES categories(`catid`),
  FOREIGN KEY (`user`) REFERENCES users(`uid`)
) ENGINE = InnoDB CHARSET = utf8 COLLATE utf8_bin;

CREATE TABLE `comments` (
  `cid` BIGINT(8) NOT NULL AUTO_INCREMENT,
  `post` BIGINT(8) NOT NULL,
  `user` BIGINT(8) NOT NULL,
  `comment` VARCHAR(20000),
  PRIMARY KEY (`cid`),
  FOREIGN KEY (`user`) REFERENCES users(`uid`),
  FOREIGN KEY(`post`) REFERENCES posts(`pid`)
) ENGINE = InnoDB CHARSET = utf8 COLLATE utf8_bin;

CREATE TABLE `postVotes` (
  `voteid` BIGINT(8)  unsigned NOT NULL AUTO_INCREMENT,
  `pid` BIGINT(8)  NOT NULL,
  `uid` BIGINT(8)  NOT NULL,
  `value` SMALLINT(8) NOT NULL,
  PRIMARY KEY (`voteid`),
  FOREIGN KEY (`pid`) REFERENCES posts(`pid`),
  FOREIGN KEY (`uid`) REFERENCES users(`uid`)
) ENGINE=InnoDB CHARSET = utf8 COLLATE utf8_bin;

CREATE TABLE `commentVotes` (
  `voteid` BIGINT(8)  unsigned NOT NULL AUTO_INCREMENT,
  `cid` BIGINT(8)  NOT NULL,
  `uid` BIGINT(8)  NOT NULL,
  `value` SMALLINT(8),
  PRIMARY KEY (`voteid`),
  FOREIGN KEY (`cid`) REFERENCES comments(`cid`),
  FOREIGN KEY (`uid`)    REFERENCES users(`uid`)
) ENGINE=InnoDB CHARSET = utf8 COLLATE utf8_bin;

/* Insert data */
INSERT INTO `users` (`username`, `email`, `password`, `userType`) VALUES
('aland', 'aland@example.com','$2y$12$5qIHGxVSKrfETbn9K5K.6.7AQ8AuiB3m6ZpWnjnPdYHkHCLEjb81C','admin'),
('root', 'root@example.net','$2y$12$5qIHGxVSKrfETbn9K5K.6.7AQ8AuiB3m6ZpWnjnPdYHkHCLEjb81C','admin'),
('jason', 'jason@example.net','$2y$12$5qIHGxVSKrfETbn9K5K.6.7AQ8AuiB3m6ZpWnjnPdYHkHCLEjb81C','moderator'),
('chris', 'chris@example.net','$2y$12$5qIHGxVSKrfETbn9K5K.6.7AQ8AuiB3m6ZpWnjnPdYHkHCLEjb81C','moderator'),
('jasmine', 'jasmine@example.com','$2y$12$5qIHGxVSKrfETbn9K5K.6.7AQ8AuiB3m6ZpWnjnPdYHkHCLEjb81C','user'),
('monica', 'monica@example.com','$2y$12$5qIHGxVSKrfETbn9K5K.6.7AQ8AuiB3m6ZpWnjnPdYHkHCLEjb81C','user'),
('silje', 'silje@example.com','$2y$12$5qIHGxVSKrfETbn9K5K.6.7AQ8AuiB3m6ZpWnjnPdYHkHCLEjb81C','user'),
('amanda', 'amanda@example.com','$2y$12$5qIHGxVSKrfETbn9K5K.6.7AQ8AuiB3m6ZpWnjnPdYHkHCLEjb81C','user'),
('marte', 'marte@example.com','$2y$12$5qIHGxVSKrfETbn9K5K.6.7AQ8AuiB3m6ZpWnjnPdYHkHCLEjb81C','user');

INSERT INTO `categories` VALUES
('1', 'IT and Computers', 'everything related to IT'),
('2', 'Computer games', 'Who doesnt love games?'),
('3', 'Culture, movie and music', 'Any thing related to entertainment');

INSERT INTO `posts` VALUES
('1', '1', '3', 'My computer wont turn on','Everything is black, what do I do?','0', CURRENT_TIMESTAMP),
('2', '1', '2', 'React vs Angular vs Vue','What is your favorite?','0', CURRENT_TIMESTAMP),
('3', '2', '8', 'Warcraft reforged is the best', 'I love the new graphics, how about you?', '0', CURRENT_TIMESTAMP),
('4', '2', '7', '1v1 match in CS GO?', 'I challenge you all to a match in 1v1, whos up?', '0', CURRENT_TIMESTAMP),
('5', '3', '2', 'Should I watch Game of Thrones?', 'yes, should I?', '0', CURRENT_TIMESTAMP),
('6', '3', '1', 'When will the cinema open again?', 'I live in Oslo, when will it open again?', '0', CURRENT_TIMESTAMP);


INSERT INTO `comments` VALUES
('1','1','2','Have you tried turning it off and on again?'),
('2','2','5','Angular is the best!'),
('3','2','6','No react ftw!'),
('5','4','4','I challenge you! add me on steam @CrazyNoScopeBoy99'),
('6','5','4','YES!!!');


INSERT INTO `postVotes` VALUES
('1','1','1','1'),
('2','1','2','1'),
('3','2','2','1'),
('4','3','3','1'),
('5','3','1','1'),
('6','3','5','1'),
('7','4','1','1'),
('8','4','2','1'),
('9','4','3','1'),
('10','4','6','1'),
('11','5','5','1'),
('12','5','4','1'),
('13','5','1','1'),
('14','5','3','1');

INSERT INTO `commentVotes` VALUES
('1','1','1','1'),
('2','2','2','1'),
('3','3','3','1'),
('4','3','4','1'),
('5','3','5','1'),
('6','4','3','1'),
('7','4','1','1'),
('8','5','2','1'),
('9','5','3','1'),
('10','5','4','1'),
('11','5','7','1'),
('12','6','3','1');

INSERT INTO `requests` VALUES
(7, 'I really want to mod', 'It seems fun'),
(8, 'Im the perfect mod', 'I have been an active user for a long time'),
(6, 'This seems fun', 'pleace accept');
