# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.18)
# Datenbank: beatyourfriends
# Erstellt am: 2019-01-30 09:17:39 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Export von Tabelle emails
# ------------------------------------------------------------

DROP TABLE IF EXISTS `emails`;

CREATE TABLE `emails` (
  `userid` int(11) NOT NULL,
  `email` varchar(256) NOT NULL,
  `won` int(4) NOT NULL,
  `equal` int(4) NOT NULL,
  `loose` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `emails` WRITE;
/*!40000 ALTER TABLE `emails` DISABLE KEYS */;

INSERT INTO `emails` (`userid`, `email`, `won`, `equal`, `loose`)
VALUES
	(1,'chrisi.senger@gmail.com',0,0,0),
	(2,'f1gaggl@edu.aau.at',0,0,0),
	(3,'migun@edu.aau.at',0,0,0),
	(4,'julius.koepke@aau.at',0,0,0);

/*!40000 ALTER TABLE `emails` ENABLE KEYS */;
UNLOCK TABLES;


# Export von Tabelle fragen
# ------------------------------------------------------------

DROP TABLE IF EXISTS `fragen`;

CREATE TABLE `fragen` (
  `Frage` varchar(700) COLLATE utf8_unicode_ci NOT NULL,
  `Antwort1` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `Antwort2` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `Antwort3` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `Richtig` int(1) NOT NULL,
  `token` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=REDUNDANT;

LOCK TABLES `fragen` WRITE;
/*!40000 ALTER TABLE `fragen` DISABLE KEYS */;

INSERT INTO `fragen` (`Frage`, `Antwort1`, `Antwort2`, `Antwort3`, `Richtig`, `token`)
VALUES
	('Welche \"E-Nummer\" hat die Milchsäure?','E 230','E 270','E 320',2,1),
	('Aus welchem Land kommt das Gericht \"Nasi Goreng\"?','Thailand','Indien','Indonesien',3,2),
	('Wie nennt man die Einheit in der die Schärfe von Lebensmitteln gemessen wird?','Capsaicin','Scoville\r\n','Metranin',2,3),
	('Welcher Ski-Alpin-Athlet konnte die meisten Siege erringen?','Marcel Hirscher','Ingemar Stenmark','Lindsey Vonn',2,4),
	('Wann geschah der verheerende Unfall von Niki Lauda, bei dem er im brennenden Fahrzeug eingeschlossen wurde?','1. September 1975','1. August 1976','1. Juli 1977',2,5),
	('Wer war 2018 Fussballer des Jahres?','Luka Modric','Cristiano Ronaldo','Lionel Messi',1,6),
	('Wer komponierte das Lied „Stille Nacht“?','Xaver Franz Gruber','Peter Leitner','Gottfried Johann Keller',1,7),
	('Mit welchem Kunstschaffenden war Alma Mahler-Werfel verheiratet?','Walter Gropius','Oskar Kokoschka','Gustav Klimt',1,8),
	('Welcher Maler ist für seine Darstellungen von Sonnenbumen berühmt?','Picasso','Klimt','Van Gogh',3,9),
	('Welcher deutsche TV-Sender strahlt das Automagazin \"GRIP\" aus?','RTL','RTL 2','VOX',1,10),
	('Das Musikvideo zu welchem Song war das erste, das auf MTV ausgestrahlt wurde?','Thriller','Video killed a Radio Star','Bohemian Rapsody',2,11),
	('Welcher Komponist schrieb den Liebestraum?','Franz Liszt','Ludwig van Beethoven','Franz Schubert',1,12),
	('Woran starb Freddie Mercury?','Unfall','Krebs','AIDS',3,13),
	('Welche ist KEINE Kirchentonart?','Lydisch','Phrygisch','Physisch',3,14),
	('Welcher Fluss bildet die Grenze zwischen Slowienen und der südlichen Steiermark?','Mur','Drau','Leit',1,15),
	('Welcher ist der größte afrikanische Staat?','Algerien','Mali','Sudan',1,16),
	('Was ist die Hauptstadt von Weißrussland?','Pristina','Minsk','Bukarest',2,17),
	('Was geschah am 15. Juli 1927?','Justizpalastbrand','Black Friday','Gründung der NSDAP',1,18),
	('Wann fand der Dreißigjährige Krieg statt?','1589 – 1619','1618 – 1648','1654 – 1684',2,23),
	('Wer übernahm das Bundeskanzeramt nach der Ermordung von Engelbert Dollfuß?','Schuschnigg','Seyß-Inquart','Hitler',1,19),
	('Was ist nicht Teil der menschlichen Zelle?','Dyctiosomen','Vakuole','Endoplasmatisches Reticulum',2,20),
	('Welcher ist der kräftigste Muskel im menschlichen Körper?','Gesäßmuskel','Magen','Kaumuskel',3,21),
	('Wie viele Knochen hat der menschliche Körper?','206','306','350',1,22),
	('Wofür steht die Abkürzung HBP?','Hohes Bundes Parlament','Heeres Bereichspräsident','Herr Bundespräsident',3,25),
	('Wieviele Mitglieder hat der Nationarat?','182','183','184',2,26),
	('Wo steht die höchste Kirche Österreichs?','Obergurgl','Kufstein','St. Anton am Arlberg',1,27),
	('Wie lange ist die Tragzeit eines Elefanten?','9 Monate','15 Monate','22 Monate',3,28),
	('Wie viele Enden hat das Geweih eines erwachsenen Rehbocks?','6','2','8',2,29),
	('Wie wird der Sperling noch genannt?','Elster','Fink ','Spatz',3,30);

/*!40000 ALTER TABLE `fragen` ENABLE KEYS */;
UNLOCK TABLES;


# Export von Tabelle game
# ------------------------------------------------------------

DROP TABLE IF EXISTS `game`;

CREATE TABLE `game` (
  `game_id` int(100) NOT NULL,
  `player1` int(4) NOT NULL,
  `player2` int(4) NOT NULL,
  `player1status` int(2) NOT NULL,
  `player2status` int(2) NOT NULL,
  `player1points` int(4) NOT NULL,
  `player2points` int(4) NOT NULL,
  `round` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Export von Tabelle playquest
# ------------------------------------------------------------

DROP TABLE IF EXISTS `playquest`;

CREATE TABLE `playquest` (
  `id` int(100) NOT NULL,
  `counter` int(4) NOT NULL,
  `token` int(4) NOT NULL,
  `Frage` varchar(500) NOT NULL,
  `Antwort1` varchar(100) NOT NULL,
  `Antwort2` varchar(100) NOT NULL,
  `Antwort3` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

LOCK TABLES `playquest` WRITE;
/*!40000 ALTER TABLE `playquest` DISABLE KEYS */;

INSERT INTO `playquest` (`id`, `counter`, `token`, `Frage`, `Antwort1`, `Antwort2`, `Antwort3`)
VALUES
	(172395,2,6,'Wer war 2018 Fussballer des Jahres?','Luka Modric','Cristiano Ronaldo','Lionel Messi'),
	(172395,3,5,'Wann geschah der verheerende Unfall von Niki Lauda, bei dem er im brennenden Fahrzeug eingeschlossen wurde?','1. September 1975','1. August 1976','1. Juli 1977'),
	(969579,2,25,'Wofür steht die Abkürzung HBP?','Hohes Bundes Parlament','Heeres Bereichspräsident','Herr Bundespräsident'),
	(969579,3,17,'Was ist die Hauptstadt von Weißrussland?','Pristina','Minsk','Bukarest'),
	(430686,1,14,'Welche ist KEINE Kirchentonart?','Lydisch','Phrygisch','Physisch'),
	(430686,2,21,'Welcher ist der kräftigste Muskel im menschlichen Körper?','Gesäßmuskel','Magen','Kaumuskel'),
	(750120,2,7,'Wer komponierte das Lied „Stille Nacht“?','Xaver Franz Gruber','Peter Leitner','Gottfried Johann Keller'),
	(750120,3,14,'Welche ist KEINE Kirchentonart?','Lydisch','Phrygisch','Physisch'),
	(672650,1,28,'Wie lange ist die Tragzeit eines Elefanten?','9 Monate','15 Monate','22 Monate'),
	(672650,2,7,'Wer komponierte das Lied „Stille Nacht“?','Xaver Franz Gruber','Peter Leitner','Gottfried Johann Keller'),
	(672650,3,29,'Wie viele Enden hat das Geweih eines erwachsenen Rehbocks?','6','2','8'),
	(948325,1,10,'Welcher deutsche TV-Sender strahlt das Automagazin \"GRIP\" aus?','RTL','RTL 2','VOX'),
	(948325,2,19,'Wer übernahm das Bundeskanzeramt nach der Ermordung von Engelbert Dollfuß?','Schuschnigg','Seyß-Inquart','Hitler'),
	(948325,3,25,'Wofür steht die Abkürzung HBP?','Hohes Bundes Parlament','Heeres Bereichspräsident','Herr Bundespräsident'),
	(718836,1,6,'Wer war 2018 Fussballer des Jahres?','Luka Modric','Cristiano Ronaldo','Lionel Messi'),
	(718836,2,10,'Welcher deutsche TV-Sender strahlt das Automagazin \"GRIP\" aus?','RTL','RTL 2','VOX'),
	(718836,3,14,'Welche ist KEINE Kirchentonart?','Lydisch','Phrygisch','Physisch'),
	(45977,1,15,'Welcher Fluss bildet die Grenze zwischen Slowienen und der südlichen Steiermark?','Mur','Drau','Leit'),
	(45977,2,26,'Wieviele Mitglieder hat der Nationarat?','182','183','184'),
	(45977,3,27,'Wo steht die höchste Kirche Österreichs?','Obergurgl','Kufstein','St. Anton am Arlberg'),
	(321844,1,21,'Welcher ist der kräftigste Muskel im menschlichen Körper?','Gesäßmuskel','Magen','Kaumuskel'),
	(321844,2,3,'Wie nennt man die Einheit in der die Schärfe von Lebensmitteln gemessen wird?','Capsaicin','Scoville\r\n','Metranin'),
	(321844,3,12,'Welcher Komponist schrieb den Liebestraum?','Franz Liszt','Ludwig van Beethoven','Franz Schubert'),
	(564945,1,20,'Was ist nicht Teil der menschlichen Zelle?','Dyctiosomen','Vakuole','Endoplasmatisches Reticulum'),
	(564945,2,11,'Das Musikvideo zu welchem Song war das erste, das auf MTV ausgestrahlt wurde?','Thriller','Video killed a Radio Star','Bohemian Rapsody'),
	(564945,3,10,'Welcher deutsche TV-Sender strahlt das Automagazin \"GRIP\" aus?','RTL','RTL 2','VOX'),
	(685575,2,30,'Wie wird der Sperling noch genannt?','Elster','Fink ','Spatz'),
	(990998,2,30,'Wie wird der Sperling noch genannt?','Elster','Fink ','Spatz'),
	(990998,3,5,'Wann geschah der verheerende Unfall von Niki Lauda, bei dem er im brennenden Fahrzeug eingeschlossen wurde?','1. September 1975','1. August 1976','1. Juli 1977'),
	(117649,1,18,'Was geschah am 15. Juli 1927?','Justizpalastbrand','Black Friday','Gründung der NSDAP'),
	(117649,3,30,'Wie wird der Sperling noch genannt?','Elster','Fink ','Spatz'),
	(436762,2,10,'Welcher deutsche TV-Sender strahlt das Automagazin \"GRIP\" aus?','RTL','RTL 2','VOX'),
	(436762,3,3,'Wie nennt man die Einheit in der die Schärfe von Lebensmitteln gemessen wird?','Capsaicin','Scoville\r\n','Metranin'),
	(460819,1,9,'Welcher Maler ist für seine Darstellungen von Sonnenbumen berühmt?','Picasso','Klimt','Van Gogh'),
	(460819,3,10,'Welcher deutsche TV-Sender strahlt das Automagazin \"GRIP\" aus?','RTL','RTL 2','VOX'),
	(70045,1,10,'Welcher deutsche TV-Sender strahlt das Automagazin \"GRIP\" aus?','RTL','RTL 2','VOX'),
	(70045,2,4,'Welcher Ski-Alpin-Athlet konnte die meisten Siege erringen?','Marcel Hirscher','Ingemar Stenmark','Lindsey Vonn'),
	(70045,3,22,'Wie viele Knochen hat der menschliche Körper?','206','306','350'),
	(80818,1,17,'Was ist die Hauptstadt von Weißrussland?','Pristina','Minsk','Bukarest'),
	(80818,2,29,'Wie viele Enden hat das Geweih eines erwachsenen Rehbocks?','6','2','8'),
	(80818,3,19,'Wer übernahm das Bundeskanzeramt nach der Ermordung von Engelbert Dollfuß?','Schuschnigg','Seyß-Inquart','Hitler'),
	(250980,1,3,'Wie nennt man die Einheit in der die Schärfe von Lebensmitteln gemessen wird?','Capsaicin','Scoville\r\n','Metranin'),
	(250980,2,2,'Aus welchem Land kommt das Gericht \"Nasi Goreng\"?','Thailand','Indien','Indonesien'),
	(250980,3,14,'Welche ist KEINE Kirchentonart?','Lydisch','Phrygisch','Physisch');

/*!40000 ALTER TABLE `playquest` ENABLE KEYS */;
UNLOCK TABLES;


# Export von Tabelle subscriptions
# ------------------------------------------------------------

DROP TABLE IF EXISTS `subscriptions`;

CREATE TABLE `subscriptions` (
  `userid` int(11) NOT NULL,
  `subscription` varchar(256) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



# Export von Tabelle tokens
# ------------------------------------------------------------

DROP TABLE IF EXISTS `tokens`;

CREATE TABLE `tokens` (
  `userid` int(11) NOT NULL,
  `token` varchar(512) NOT NULL,
  `passtoken` varchar(512) NOT NULL,
  `expires` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



# Export von Tabelle users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `password` varchar(256) NOT NULL DEFAULT '',
  `firstname` varchar(256) NOT NULL DEFAULT '',
  `lastname` varchar(256) NOT NULL DEFAULT '',
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;

INSERT INTO `users` (`id`, `password`, `firstname`, `lastname`, `email`)
VALUES
	(1,'12345','Christina','Senger','chrisi.senger@gmail.com'),
	(2,'12345','Felix','Gaggl','f1gaggl@edu.aau.at'),
	(3,'12345','Michael','Gundlacker','migun@edu.aau.at'),
	(4,'julius4Win','Julius','Köpke','julius.koepke@aau.at');

/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
