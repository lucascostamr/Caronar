CREATE DATABASE  IF NOT EXISTS `bdcarona` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bdcarona`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: bdcarona
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carro`
--

DROP TABLE IF EXISTS `carro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carro` (
  `Placa` varchar(45) NOT NULL,
  `Modelo` varchar(100) NOT NULL,
  `Marca` varchar(100) NOT NULL,
  `Cor` varchar(50) NOT NULL,
  `idMotorista` varchar(45) NOT NULL,
  PRIMARY KEY (`Placa`),
  KEY `idMotorista` (`idMotorista`),
  CONSTRAINT `carro_ibfk_1` FOREIGN KEY (`idMotorista`) REFERENCES `motorista` (`CNHmotorista`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carro`
--

LOCK TABLES `carro` WRITE;
/*!40000 ALTER TABLE `carro` DISABLE KEYS */;
INSERT INTO `carro` VALUES ('ABC123','Gol','Volkswagen','Prata','CNH1'),('DEF456','Civic','Honda','Preto','CNH2'),('GHI789','Onix','Chevrolet','Branco','CNH4'),('JKL012','HB20','Hyundai','Vermelho','CNH2'),('LMN012','Focus','Ford','Azul','CNH4'),('MNO345','Corolla','Toyota','Azul','cnh5'),('PQR345','Cruze','Chevrolet','Prata','CNH5'),('XYZ789','Fiesta','Ford','Vermelho','CNH3');
/*!40000 ALTER TABLE `carro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `endereco`
--

DROP TABLE IF EXISTS `endereco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `endereco` (
  `Estado` varchar(50) NOT NULL,
  `EnderecoID` int NOT NULL AUTO_INCREMENT,
  `Numero` int NOT NULL,
  `Bairro` varchar(100) NOT NULL,
  `Cidade` varchar(100) NOT NULL,
  `Rua` varchar(100) NOT NULL,
  `CEP` varchar(45) NOT NULL,
  `Complemento` varchar(50) DEFAULT NULL,
  `idMotorista` varchar(45) DEFAULT NULL,
  `idPassageiro` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`EnderecoID`),
  KEY `idMotorista` (`idMotorista`),
  KEY `idPassageiro` (`idPassageiro`),
  CONSTRAINT `endereco_ibfk_1` FOREIGN KEY (`idMotorista`) REFERENCES `motorista` (`CNHmotorista`),
  CONSTRAINT `endereco_ibfk_2` FOREIGN KEY (`idPassageiro`) REFERENCES `passageiro` (`CPF`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `endereco`
--

LOCK TABLES `endereco` WRITE;
/*!40000 ALTER TABLE `endereco` DISABLE KEYS */;
INSERT INTO `endereco` VALUES ('São Paulo',1,123,'Centro','São Paulo','Rua A','01001-000','Apto 101','CNH1',NULL),('Rio de Janeiro',2,456,'Copacabana','Rio de Janeiro','Rua B','22011-000',NULL,'CNH2',NULL),('Minas Gerais',3,789,'Savassi','Belo Horizonte','Rua C','30130-000','Casa 3','CNH3',NULL),('Paraná',4,321,'Batel','Curitiba','Rua D','80420-090','Apartamento 502',NULL,'111.111.111-11'),('Rio Grande do Sul',5,654,'Moinhos de Vento','Porto Alegre','Rua E','90570-040',NULL,NULL,'222.222.222-22'),('Bahia',6,987,'Pituba','Salvador','Rua F','40140-010',NULL,'CNH1',NULL),('Goiás',7,654,'Setor Bueno','Goiânia','Rua G','74515-010',NULL,NULL,NULL),('Ceará',8,321,'Meireles','Fortaleza','Rua H','60125-150','Apto 202','CNH2',NULL);
/*!40000 ALTER TABLE `endereco` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motorista`
--

DROP TABLE IF EXISTS `motorista`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `motorista` (
  `CNHmotorista` varchar(45) NOT NULL,
  `Nome` varchar(100) NOT NULL,
  `Telefone` varchar(20) NOT NULL,
  `Classificacao` int NOT NULL DEFAULT '0',
  `Email` varchar(100) NOT NULL,
  `Sexo` enum('F','M') NOT NULL,
  `DataNascimento` date NOT NULL,
  `CarroAtual` varchar(45) DEFAULT NULL,
  `ImagemPerfil` varchar(255) DEFAULT 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1H81w4SmKH5DZmIbxU7EB0aMSkNQDoPQA1mRQxf2Y0wMF1NSa7vghbwwKASi1q4NPmNw&usqp=CAU',
  PRIMARY KEY (`CNHmotorista`),
  UNIQUE KEY `CNHmotorista_UNIQUE` (`CNHmotorista`),
  UNIQUE KEY `CarroAtual_UNIQUE` (`CarroAtual`),
  CONSTRAINT `motorista_ibfk_1` FOREIGN KEY (`CarroAtual`) REFERENCES `carro` (`Placa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motorista`
--

LOCK TABLES `motorista` WRITE;
/*!40000 ALTER TABLE `motorista` DISABLE KEYS */;
INSERT INTO `motorista` VALUES ('CNH1','João da Silva','(11) 98765-4321',5,'joao.silva@example.com','M','1985-07-10',NULL,'https://github.com/DreaMagici4n/Caronar/assets/105292741/9f9d578f-f18d-4ed6-93e0-96b416334aa8'),('CNH2','Maria Santos','(21) 98765-4321',4,'maria.santos@example.com','F','1990-03-22','DEF456',NULL),('CNH3','Carlos Souza','(31) 98765-4321',3,'carlos.souza@example.com','M','1993-11-18',NULL,NULL),('CNH4','Ana Oliveira','(41) 98765-4321',2,'ana.oliveira@example.com','F','1988-06-15',NULL,NULL),('CNH5','Pedro Almeida','(51) 98765-4321',1,'pedro.almeida@example.com','M','1995-09-30',NULL,NULL),('CNH6','Mariana Santos','(11) 98765-4321',4,'mariana.santos@example.com','F','1992-02-12','XYZ789',NULL),('CNH7','Pedro Silva','(51) 98765-4321',3,'pedro.silva@example.com','M','1996-12-30','PQR345',NULL);
/*!40000 ALTER TABLE `motorista` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `passageiro`
--

DROP TABLE IF EXISTS `passageiro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `passageiro` (
  `Nome` varchar(100) NOT NULL,
  `CPF` varchar(45) NOT NULL,
  `Sexo` enum('F','M') NOT NULL,
  `Celular` varchar(20) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `DataNascimento` date NOT NULL,
  `ImagemPerfil` varchar(255) DEFAULT 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1H81w4SmKH5DZmIbxU7EB0aMSkNQDoPQA1mRQxf2Y0wMF1NSa7vghbwwKASi1q4NPmNw&usqp=CAU',
  PRIMARY KEY (`CPF`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `passageiro`
--

LOCK TABLES `passageiro` WRITE;
/*!40000 ALTER TABLE `passageiro` DISABLE KEYS */;
INSERT INTO `passageiro` VALUES ('Rafaela Ferreira','111.111.111-11','F','(11) 99999-9999','rafaela.ferreira@example.com','1994-03-15','\"https://github.com/DreaMagici4n/Caronar/assets/105292741/4500895c-5c4b-40af-b2a1-0457da524259\"'),('Gustavo Lima','222.222.222-22','M','(21) 99999-9999','gustavo.lima@example.com','1996-08-20',NULL),('Fernanda Oliveira','333.333.333-33','F','(31) 99999-9999','fernanda.oliveira@example.com','1998-12-05','https://github.com/DreaMagici4n/Caronar/assets/105292741/9f9d578f-f18d-4ed6-93e0-96b416334aa8'),('Rodrigo Santos','444.444.444-44','M','(41) 99999-9999','rodrigo.santos@example.com','2000-04-10',NULL),('Camila Souza','555.555.555-55','F','(51) 99999-9999','camila.souza@example.com','2002-07-25','https://github.com/DreaMagici4n/Caronar/assets/105292741/9f9d578f-f18d-4ed6-93e0-96b416334aa8'),('Fernando Oliveira','666.666.666-66','M','(31) 99999-9999','fernando.oliveira@example.com','1990-09-18',NULL),('Natalia Oliveira','777.777.777-77','F','(11) 99999-9999','natalia_oliveira@example.com','1994-03-15',NULL),('Lucas Oliveira','888.888.888-88','M','(41) 99999-9999','lucas.oliveira@example.com','1992-11-26',NULL),('Isabela Santos','999.999.999-99','F','(51) 99999-9999','isabela.santos@example.com','1997-04-17',NULL);
/*!40000 ALTER TABLE `passageiro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `realiza`
--

DROP TABLE IF EXISTS `realiza`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `realiza` (
  `ViagemID` int NOT NULL,
  `CPF` varchar(45) NOT NULL,
  PRIMARY KEY (`ViagemID`,`CPF`),
  KEY `ViagemID` (`ViagemID`),
  KEY `CPF` (`CPF`),
  CONSTRAINT `realiza_ibfk_1` FOREIGN KEY (`ViagemID`) REFERENCES `viagem` (`ViagemID`),
  CONSTRAINT `realiza_ibfk_2` FOREIGN KEY (`CPF`) REFERENCES `passageiro` (`CPF`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `realiza`
--

LOCK TABLES `realiza` WRITE;
/*!40000 ALTER TABLE `realiza` DISABLE KEYS */;
INSERT INTO `realiza` VALUES (32,'666.666.666-66'),(35,'111.111.111-11'),(35,'222.222.222-22'),(36,'111.111.111-11'),(36,'333.333.333-33'),(37,'444.444.444-44'),(38,'555.555.555-55');
/*!40000 ALTER TABLE `realiza` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `viagem`
--

DROP TABLE IF EXISTS `viagem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `viagem` (
  `ViagemID` int NOT NULL AUTO_INCREMENT,
  `Data` date NOT NULL,
  `Hora` time NOT NULL,
  `Destino` varchar(100) NOT NULL,
  `Origem` varchar(100) NOT NULL,
  `Preco` int NOT NULL,
  `Vagas` int NOT NULL,
  `idMotorista` varchar(45) NOT NULL,
  `duracao` time NOT NULL,
  `ativo` binary(1) DEFAULT '1',
  PRIMARY KEY (`ViagemID`),
  KEY `idMotorista` (`idMotorista`),
  CONSTRAINT `viagem_ibfk_1` FOREIGN KEY (`idMotorista`) REFERENCES `motorista` (`CNHmotorista`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `viagem`
--

LOCK TABLES `viagem` WRITE;
/*!40000 ALTER TABLE `viagem` DISABLE KEYS */;
INSERT INTO `viagem` VALUES (6,'2023-07-10','08:00:00','São Paulo','Rio de Janeiro',100,3,'CNH1','04:00:00',_binary '1'),(7,'2023-07-11','09:30:00','Belo Horizonte','Rio de Janeiro',80,2,'CNH2','03:30:00',_binary '1'),(8,'2023-07-12','14:00:00','Curitiba','São Paulo',120,4,'CNH4','06:00:00',_binary '1'),(9,'2023-07-13','16:30:00','Porto Alegre','Belo Horizonte',150,1,'CNH3','07:30:00',_binary '1'),(10,'2023-07-14','18:00:00','São Paulo','Curitiba',90,3,'CNH5','05:00:00',_binary '1'),(11,'2023-07-14','18:00:00','São Paulo','Curitiba',90,3,'CNH1','05:00:00',_binary '1'),(12,'2023-07-10','08:00:00','São Paulo','Rio de Janeiro',100,3,'CNH1','04:00:00',_binary '1'),(13,'2023-07-10','08:00:00','São Paulo','Rio de Janeiro',100,3,'CNH1','04:00:00',_binary '1'),(14,'2023-07-10','08:00:00','São Paulo','Rio de Janeiro',100,3,'CNH1','04:00:00',_binary '1'),(15,'2023-07-10','08:00:00','São Paulo','Rio de Janeiro',100,3,'CNH1','04:00:00',_binary '1'),(16,'2023-07-10','08:00:00','São Paulo','Rio de Janeiro',100,3,'CNH1','04:00:00',_binary '1'),(17,'2023-07-10','08:00:00','São Paulo','Rio de Janeiro',100,3,'CNH1','04:00:00',_binary '1'),(18,'2023-07-10','08:00:00','São Paulo','Rio de Janeiro',100,3,'CNH1','04:00:00',_binary '1'),(19,'2023-07-10','08:00:00','São Paulo','Rio de Janeiro',100,3,'CNH1','04:00:00',_binary '1'),(20,'2023-07-10','08:00:00','São Paulo','Rio de Janeiro',100,3,'CNH1','04:00:00',_binary '1'),(21,'2023-07-10','08:00:00','São Paulo','Rio de Janeiro',100,3,'CNH1','04:00:00',_binary '1'),(22,'2023-07-10','08:00:00','São Paulo','Rio de Janeiro',100,3,'CNH1','04:00:00',_binary '1'),(23,'2023-07-10','08:00:00','São Paulo','Rio de Janeiro',100,3,'CNH1','04:00:00',_binary '1'),(24,'2023-07-10','08:00:00','São Paulo','Rio de Janeiro',100,3,'CNH1','04:00:00',_binary '1'),(25,'2023-07-10','08:00:00','São Paulo','Rio de Janeiro',100,3,'CNH1','04:00:00',_binary '1'),(26,'2023-07-10','08:00:00','São Paulo','Rio de Janeiro',100,3,'CNH1','04:00:00',_binary '1'),(27,'2023-07-10','08:00:00','São Paulo','Rio de Janeiro',100,3,'CNH1','04:00:00',_binary '1'),(28,'2023-07-10','08:00:00','São Paulo','Rio de Janeiro',100,3,'CNH1','04:00:00',_binary '1'),(29,'2023-07-10','08:00:00','São Paulo','Rio de Janeiro',100,3,'CNH1','04:00:00',_binary '1'),(30,'2023-07-10','08:00:00','São Paulo','Rio de Janeiro',100,3,'CNH1','04:00:00',_binary '1'),(31,'2023-07-10','08:00:00','São Paulo','Rio de Janeiro',100,3,'CNH1','04:00:00',_binary '1'),(32,'2023-07-15','10:00:00','Salvador','Belo Horizonte',150,2,'CNH6','08:00:00',_binary '1'),(33,'2023-07-16','12:00:00','Goiânia','Fortaleza',200,3,'CNH7','10:00:00',_binary '1'),(35,'2023-01-05','09:00:00','São Paulo','Rio de Janeiro',100,3,'CNH1','04:00:00',_binary '1'),(36,'2023-01-12','14:30:00','Rio de Janeiro','Belo Horizonte',120,4,'CNH2','06:00:00',_binary '1'),(37,'2023-02-08','10:00:00','Belo Horizonte','São Paulo',90,3,'CNH3','05:00:00',_binary '1'),(38,'2023-02-16','15:30:00','São Paulo','Curitiba',110,2,'CNH4','05:30:00',_binary '1'),(39,'2023-03-07','11:30:00','Curitiba','São Paulo',95,3,'CNH5','04:30:00',_binary '1'),(40,'2023-03-21','16:00:00','São Paulo','Rio de Janeiro',105,2,'CNH6','04:30:00',_binary '1'),(41,'2023-04-09','09:30:00','Rio de Janeiro','Belo Horizonte',130,4,'CNH1','06:30:00',_binary '1'),(42,'2023-04-18','13:00:00','Belo Horizonte','São Paulo',95,3,'CNH2','05:00:00',_binary '1'),(43,'2023-05-02','11:30:00','São Paulo','Curitiba',110,2,'CNH3','05:30:00',_binary '1'),(44,'2023-05-17','17:00:00','Curitiba','São Paulo',100,3,'CNH4','04:30:00',_binary '1'),(45,'2023-06-11','10:30:00','São Paulo','Rio de Janeiro',120,2,'CNH5','04:00:00',_binary '1'),(46,'2023-06-25','15:00:00','Rio de Janeiro','Belo Horizonte',135,4,'CNH6','06:30:00',_binary '1');
/*!40000 ALTER TABLE `viagem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'bdcarona'
--

--
-- Dumping routines for database 'bdcarona'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-19 10:04:39
