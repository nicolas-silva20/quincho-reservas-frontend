CREATE DATABASE  IF NOT EXISTS `quincho_reservas_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `quincho_reservas_db`;
-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: quincho_reservas_db
-- ------------------------------------------------------
-- Server version	9.5.0

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '5fd4a994-d78c-11f0-96b1-f02f7482c22d:1-127';

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fecha_registro` datetime(6) DEFAULT NULL,
  `nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefono` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_1c96wv36rk2hwui7qhjks3mvg` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,NULL,'2025-12-12 23:44:41.927178','Pablo Gutierrez','+5491112345678'),(2,NULL,'2025-12-12 23:45:02.628696','Carmen Gutierrez','+5491112345678'),(3,NULL,'2025-12-12 23:46:15.866412','Maria Gonzalez','+5491112345678'),(4,NULL,'2025-12-12 23:54:26.058065','Pedro Gonzalez','+5491112345678'),(5,NULL,'2025-12-13 14:38:42.775978','Pablo Gutierrez','+5491112345678'),(6,NULL,'2025-12-13 23:26:07.419332','Carolina Perez','+5491112345678'),(7,NULL,'2025-12-13 23:33:31.000259','Carlos Andrada','+5491112345678'),(8,NULL,'2025-12-13 23:40:53.247787','Cristian Armando','+5491112345679'),(9,'maria.gonzalez@email.com','2025-12-14 03:26:13.000000','Mar??a Gonz??lez','1154782345'),(10,'carlos.fernandez@email.com','2025-12-14 03:26:13.000000','Carlos Fern??ndez','1165893421'),(11,'laura.martinez@email.com','2025-12-14 03:26:13.000000','Laura Mart??nez','1143567890'),(12,'roberto.silva@email.com','2025-12-14 03:26:13.000000','Roberto Silva','1156789234'),(13,'ana.rodriguez@email.com','2025-12-14 03:26:13.000000','Ana Rodr??guez','1167234589'),(14,NULL,'2025-12-14 06:49:57.834339','Pablo Gutierrez','+5491112345678'),(15,NULL,'2025-12-14 07:16:09.755556','Carl Orso','+5491112345679'),(16,NULL,'2025-12-14 07:30:19.537087','Pablo Gutierrez','+5491112345678'),(17,NULL,'2025-12-14 07:34:07.806445','Nicolas Silva','+5491112345678'),(18,NULL,'2025-12-29 00:33:30.216601','Pablo Gutierrez','+5491112345678'),(19,NULL,'2025-12-29 00:46:26.243949','Nombre Prueba','+5491112345678'),(20,NULL,'2025-12-29 01:00:40.606163','Nombre Test01','+5491112345678');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `experiencias`
--

DROP TABLE IF EXISTS `experiencias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experiencias` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `activo` bit(1) DEFAULT NULL,
  `descripcion` text COLLATE utf8mb4_unicode_ci,
  `nombre` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `precio_base` decimal(10,2) NOT NULL,
  `precio_fijo` bit(1) DEFAULT NULL,
  `tipo` enum('ESTANDAR','PERSONALIZADA','PROMOCION') COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experiencias`
--

LOCK TABLES `experiencias` WRITE;
/*!40000 ALTER TABLE `experiencias` DISABLE KEYS */;
INSERT INTO `experiencias` VALUES (1,_binary '','Paquete básico con las comodidades esenciales para tu evento','ESTÁNDAR',15000.00,_binary '','ESTANDAR'),(2,_binary '','Armá tu propia experiencia seleccionando los extras que necesites','PERSONALIZADA',15000.00,_binary '\0','PERSONALIZADA'),(3,_binary '','Paquete especial del mes con servicios premium a precio promocional','PROMOCIÓN - MES DICIEMBRE',20000.00,_binary '','PROMOCION');
/*!40000 ALTER TABLE `experiencias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items_experiencia`
--

DROP TABLE IF EXISTS `items_experiencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items_experiencia` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `costo_adicional` decimal(10,2) DEFAULT NULL,
  `incluido` bit(1) NOT NULL,
  `nombre` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `obligatorio` bit(1) DEFAULT NULL,
  `experiencia_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK58c4upngjux7kffn54awmuhi` (`experiencia_id`),
  CONSTRAINT `FK58c4upngjux7kffn54awmuhi` FOREIGN KEY (`experiencia_id`) REFERENCES `experiencias` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items_experiencia`
--

LOCK TABLES `items_experiencia` WRITE;
/*!40000 ALTER TABLE `items_experiencia` DISABLE KEYS */;
INSERT INTO `items_experiencia` VALUES (1,0.00,_binary '','Parrilla completa',_binary '\0',1),(2,0.00,_binary '','Mesa y sillas (8 personas)',_binary '\0',1),(3,0.00,_binary '','Baño completo',_binary '\0',1),(4,0.00,_binary '','Iluminación exterior',_binary '\0',1),(5,0.00,_binary '\0','Horno de barro',_binary '\0',1),(6,0.00,_binary '\0','Pileta climatizada',_binary '\0',1),(7,0.00,_binary '\0','Barra con heladera',_binary '\0',1),(8,0.00,_binary '\0','Fogón',_binary '\0',1),(9,0.00,_binary '\0','Sistema de música ambiente',_binary '\0',1),(10,0.00,_binary '\0','Quincho techado',_binary '\0',1),(11,0.00,_binary '','Parrilla completa',_binary '',2),(12,0.00,_binary '','Mesa y sillas (8 personas)',_binary '',2),(13,0.00,_binary '','Baño completo',_binary '',2),(14,0.00,_binary '','Iluminación exterior',_binary '',2),(15,3000.00,_binary '\0','Horno de barro',_binary '\0',2),(16,5000.00,_binary '\0','Pileta climatizada',_binary '\0',2),(17,2500.00,_binary '\0','Barra con heladera',_binary '\0',2),(18,2000.00,_binary '\0','Fogón',_binary '\0',2),(19,3500.00,_binary '\0','Sistema de música ambiente',_binary '\0',2),(20,4000.00,_binary '\0','Quincho techado',_binary '\0',2),(21,0.00,_binary '','Parrilla completa',_binary '\0',3),(22,0.00,_binary '','Mesa y sillas (8 personas)',_binary '\0',3),(23,0.00,_binary '','Baño completo',_binary '\0',3),(24,0.00,_binary '','Iluminación exterior',_binary '\0',3),(25,0.00,_binary '','Horno de barro',_binary '\0',3),(26,0.00,_binary '','Pileta climatizada',_binary '\0',3),(27,0.00,_binary '','Barra con heladera',_binary '\0',3),(28,0.00,_binary '\0','Fogón',_binary '\0',3),(29,0.00,_binary '','Sistema de música ambiente',_binary '\0',3),(30,0.00,_binary '\0','Quincho techado',_binary '\0',3);
/*!40000 ALTER TABLE `items_experiencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lista_espera`
--

DROP TABLE IF EXISTS `lista_espera`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lista_espera` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fecha_deseada` date NOT NULL,
  `fecha_registro` datetime(6) DEFAULT NULL,
  `hora_deseada` time(6) NOT NULL,
  `nombre_cliente` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `notificado` bit(1) DEFAULT NULL,
  `telefono` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `experiencia_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKbf1vm9ho11kcokmou3srvi9vi` (`experiencia_id`),
  CONSTRAINT `FKbf1vm9ho11kcokmou3srvi9vi` FOREIGN KEY (`experiencia_id`) REFERENCES `experiencias` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lista_espera`
--

LOCK TABLES `lista_espera` WRITE;
/*!40000 ALTER TABLE `lista_espera` DISABLE KEYS */;
INSERT INTO `lista_espera` VALUES (1,NULL,'2026-01-07','2025-12-13 00:06:09.258703','12:00:00.000000','Nicolas Silva',_binary '','+5492615634492',1),(2,NULL,'2026-01-12','2025-12-14 07:03:51.645152','13:00:00.000000','Fer Alonso',_binary '\0','+549261563877',3),(3,NULL,'2026-02-12','2025-12-14 07:21:22.594146','13:00:00.000000','Maria Gonzalez',_binary '\0','+5492615647899',1),(4,NULL,'2026-01-07','2025-12-14 07:44:50.002167','13:00:00.000000','Maria Gonzalez',_binary '\0','+5492615647899',3),(5,NULL,'2026-01-29','2025-12-29 01:01:38.554995','12:00:00.000000','Nombre Test02',_binary '\0','+5492615647899',2),(6,NULL,'2026-01-23','2025-12-29 01:09:51.748469','12:00:00.000000','Nombre Test03',_binary '\0','+5492615647899',2),(7,NULL,'2026-01-29','2025-12-29 01:14:45.154485','19:00:00.000000','Nombre Test04',_binary '\0','+5492615647899',2);
/*!40000 ALTER TABLE `lista_espera` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resenas`
--

DROP TABLE IF EXISTS `resenas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resenas` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `aprobada` bit(1) NOT NULL,
  `calificacion` int NOT NULL,
  `comentario` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha_aprobacion` datetime(6) DEFAULT NULL,
  `fecha_creacion` datetime(6) NOT NULL,
  `cliente_id` bigint NOT NULL,
  `reserva_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKeolanbiomkdjmlu5mapnj7jm2` (`cliente_id`),
  KEY `FK79jc63qmc61cwg52fmsc0pvto` (`reserva_id`),
  CONSTRAINT `FK79jc63qmc61cwg52fmsc0pvto` FOREIGN KEY (`reserva_id`) REFERENCES `reservas` (`id`),
  CONSTRAINT `FKeolanbiomkdjmlu5mapnj7jm2` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resenas`
--

LOCK TABLES `resenas` WRITE;
/*!40000 ALTER TABLE `resenas` DISABLE KEYS */;
INSERT INTO `resenas` VALUES (1,_binary '',5,'Incre??ble experiencia! El lugar es hermoso y la atenci??n fue excelente. Celebramos el cumplea??os de mi hijo y todos quedaron encantados. 100% recomendable.','2025-12-10 03:26:13.000000','2025-12-09 03:26:13.000000',13,NULL),(2,_binary '',5,'El quincho super?? todas nuestras expectativas. Espacioso, limpio y con todas las comodidades. La parrilla es espectacular y el jard??n perfecto para los chicos.','2025-12-03 03:26:13.000000','2025-12-02 03:26:13.000000',12,NULL),(3,_binary '',4,'Muy buen lugar para eventos. Lo usamos para una reuni??n familiar y estuvo genial. El ??nico detalle es que el acceso puede ser un poco complicado, pero nada grave.','2025-11-25 03:26:13.000000','2025-11-24 03:26:13.000000',11,NULL),(4,_binary '',5,'Excelente para cumplea??os! Vinimos con 30 personas y hab??a espacio de sobra. La pileta fue un ??xito con los chicos. Volveremos seguro.','2025-11-10 03:26:13.000000','2025-11-09 03:26:13.000000',10,NULL),(5,_binary '',4,'Lugar muy c??modo y bien equipado. Ideal para pasar el d??a con amigos. La atenci??n al cliente es de primera. Solo le faltar??a un poco m??s de sombra en el sector del quincho.','2025-12-14 06:30:36.544068','2025-12-12 03:26:13.000000',9,NULL);
/*!40000 ALTER TABLE `resenas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservas`
--

DROP TABLE IF EXISTS `reservas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservas` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `deposito_garantia` decimal(10,2) NOT NULL,
  `estado` enum('PENDIENTE','PRE_CONFIRMADA','CONFIRMADA','PAGADA_COMPLETA','EN_CURSO','FINALIZADA','CANCELADA_CLIENTE','CANCELADA_ADMIN','DEPOSITO_DEVUELTO') COLLATE utf8mb4_unicode_ci NOT NULL,
  `estado_pago` enum('PENDIENTE','SENA_PAGADA','PAGADO_COMPLETO','DEPOSITO_RETENIDO','DEPOSITO_DEVUELTO') COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha_creacion` datetime(6) NOT NULL,
  `fecha_evento` date NOT NULL,
  `fecha_visita` datetime(6) DEFAULT NULL,
  `hora_inicio` time(6) NOT NULL,
  `horario_contacto` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `observaciones` text COLLATE utf8mb4_unicode_ci,
  `precio_experiencia` decimal(10,2) NOT NULL,
  `precio_total` decimal(10,2) NOT NULL,
  `terminos_aceptados` bit(1) DEFAULT NULL,
  `cliente_id` bigint NOT NULL,
  `experiencia_id` bigint NOT NULL,
  `resena_token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `token_usado` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `resena_token` (`resena_token`),
  KEY `FKpays115gahfu3ffuywded1xqt` (`cliente_id`),
  KEY `FKembkd4g6ln501o83l7qnp53ld` (`experiencia_id`),
  CONSTRAINT `FKembkd4g6ln501o83l7qnp53ld` FOREIGN KEY (`experiencia_id`) REFERENCES `experiencias` (`id`),
  CONSTRAINT `FKpays115gahfu3ffuywded1xqt` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservas`
--

LOCK TABLES `reservas` WRITE;
/*!40000 ALTER TABLE `reservas` DISABLE KEYS */;
INSERT INTO `reservas` VALUES (1,100000.00,'FINALIZADA','PAGADO_COMPLETO','2025-12-12 23:44:41.966181','2026-01-07',NULL,'12:00:00.000000','09:00-12:00',NULL,20000.00,120000.00,_binary '',1,3,NULL,0),(2,100000.00,'CANCELADA_ADMIN','PENDIENTE','2025-12-12 23:45:02.633697','2026-01-06',NULL,'16:00:00.000000','18:00-21:00',NULL,15000.00,115000.00,_binary '',2,1,NULL,0),(3,100000.00,'CANCELADA_ADMIN','PENDIENTE','2025-12-12 23:46:15.870408','2026-01-06',NULL,'16:00:00.000000','18:00-21:00',NULL,15000.00,115000.00,_binary '',3,2,NULL,0),(4,100000.00,'FINALIZADA','PAGADO_COMPLETO','2025-12-12 23:54:26.063065','2026-01-07',NULL,'10:00:00.000000','15:00-18:00',NULL,15000.00,115000.00,_binary '',4,1,NULL,0),(5,100000.00,'FINALIZADA','PENDIENTE','2025-12-13 14:38:42.834317','2025-12-15',NULL,'10:00:00.000000','18:00-21:00',NULL,15000.00,115000.00,_binary '',5,1,NULL,0),(6,100000.00,'FINALIZADA','PAGADO_COMPLETO','2025-12-13 23:26:07.443575','2026-01-16',NULL,'20:00:00.000000','09:00-12:00',NULL,15000.00,115000.00,_binary '',6,1,NULL,0),(7,100000.00,'FINALIZADA','PAGADO_COMPLETO','2025-12-13 23:33:31.003258','2025-12-26',NULL,'13:00:00.000000','09:00-12:00',NULL,15000.00,115000.00,_binary '',7,1,'cadc6721-f44b-4822-a5df-4ea176fc217f',0),(8,100000.00,'FINALIZADA','PAGADO_COMPLETO','2025-12-13 23:40:53.251786','2026-01-10',NULL,'13:00:00.000000','12:00-15:00',NULL,20000.00,120000.00,_binary '',8,3,'6953d583-f744-452a-ade5-b0e7cc67d048',1),(9,100000.00,'PRE_CONFIRMADA','PENDIENTE','2025-12-14 06:49:57.855341','2026-01-12',NULL,'20:00:00.000000','09:00-12:00',NULL,15000.00,115000.00,_binary '',14,1,NULL,0),(10,100000.00,'PRE_CONFIRMADA','PENDIENTE','2025-12-14 07:16:09.761555','2026-02-12',NULL,'13:00:00.000000','12:00-15:00',NULL,15000.00,115000.00,_binary '',15,1,NULL,0),(11,100000.00,'PRE_CONFIRMADA','PENDIENTE','2025-12-14 07:30:19.541086','2025-12-25',NULL,'20:00:00.000000','15:00-18:00',NULL,15000.00,115000.00,_binary '',16,1,NULL,0),(12,100000.00,'PRE_CONFIRMADA','PENDIENTE','2025-12-14 07:34:07.809447','2026-01-09',NULL,'13:00:00.000000','09:00-12:00',NULL,15000.00,115000.00,_binary '',17,1,NULL,0),(13,100000.00,'PRE_CONFIRMADA','PENDIENTE','2025-12-29 00:33:30.259150','2026-01-14',NULL,'12:00:00.000000','09:00-12:00',NULL,15000.00,115000.00,_binary '',18,1,NULL,0),(14,100000.00,'PRE_CONFIRMADA','PENDIENTE','2025-12-29 00:46:26.246948','2026-01-23',NULL,'19:00:00.000000','18:00-21:00',NULL,15000.00,115000.00,_binary '',19,2,NULL,0),(15,100000.00,'PRE_CONFIRMADA','PENDIENTE','2025-12-29 01:00:40.641167','2026-01-29',NULL,'12:00:00.000000','12:00-15:00','{\"extras\":[{\"nombre\":\"Mantel blanco\",\"cantidad\":3,\"precioUnitario\":5000,\"subtotal\":15000}]}',315000.00,415000.00,_binary '',20,2,NULL,0);
/*!40000 ALTER TABLE `reservas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `activo` bit(1) NOT NULL,
  `fecha_creacion` datetime(6) DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rol` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_m2dvbwfge291euvmk6vkkocao` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,_binary '','2025-12-12 19:33:24.000000','$2b$10$KShhrzDJvNKLx8JLQIoRQ.7H8ew9BWqe/3GpJsMxbVVQKVyEEaXJi','ADMIN','Nicolas Silva'),(5,_binary '',NULL,'$2b$10$sa5gHaZAcdsbKz.VsCXmfu2Oyyp3bFcmKgX6JHUVncCYN9DCA7LmS','ADMIN','Juan Silva');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-29 14:43:15
