-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: landing_page
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `links`
--

DROP TABLE IF EXISTS `links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `links` (
  `idLink` int(255) NOT NULL AUTO_INCREMENT,
  `linkTitle` varchar(255) DEFAULT NULL,
  `link` longtext,
  `LinkDescription` varchar(255) DEFAULT NULL,
  `LinkImgName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`idLink`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `links`
--

LOCK TABLES `links` WRITE;
/*!40000 ALTER TABLE `links` DISABLE KEYS */;
INSERT INTO `links` VALUES (11,'Merjenje kakovosti zraka (Dolenjska)','http://194.249.1.99:3000/d/r8PnLNTWz/kakovost-zraka-dolenjska?orgId=4&from=now-6h&to=now','Merjenje kakovosti zraka na Dolenjskem','slika-1572079000105.png'),(12,'Merjenje kakovosti zraka (Primorska)','http://194.249.1.99:3000/d/oVVqwNTZz/zahodna-slovenija?orgId=4','Merjenje kakovosti zraka na Primorskem','slika-1572079080686.png'),(13,'Merjenje hitrosti prometa','http://194.249.1.99:3000/d/vivozite001/karta?orgId=4&from=1570990366574&to=1571076766574','Merjenje hitrosti prometa v Novem mestu','slika-1572079181828.png'),(14,'Elektrarna na obnovljive vire','http://194.249.1.99:3000/d/Qxg7yHTWz/elektrarna_1?orgId=4','Merjenje hidroelektrarne SCNM','slika-1572079285840.png');
/*!40000 ALTER TABLE `links` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-10-26 10:43:25
