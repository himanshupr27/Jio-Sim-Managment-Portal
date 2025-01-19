-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: jio_sim
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `ekyc_details`
--

DROP TABLE IF EXISTS `ekyc_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ekyc_details` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `aadhar` varchar(255) DEFAULT NULL,
  `addresspic` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `pan` varchar(255) DEFAULT NULL,
  `panpic` varchar(255) DEFAULT NULL,
  `profilepic` varchar(255) DEFAULT NULL,
  `video` varchar(255) DEFAULT NULL,
  `profile_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `aadhar_UNIQUE` (`aadhar`),
  UNIQUE KEY `pan_UNIQUE` (`pan`),
  UNIQUE KEY `UKj6b25ecq4smthfcn04yria7m8` (`profile_id`),
  CONSTRAINT `FKjw9ll6epmq93ug526j6iklst0` FOREIGN KEY (`profile_id`) REFERENCES `profiles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ekyc_details`
--

LOCK TABLES `ekyc_details` WRITE;
/*!40000 ALTER TABLE `ekyc_details` DISABLE KEYS */;
INSERT INTO `ekyc_details` VALUES (1,'123456789012','14.1.png','APROVED','ABCDE4321F','dma1.png','7.PNG','Base64EncodedStringForVideo',1),(2,'123456789015','14.1.png','APROVAL PENDING','ABCDE1235F','dma1.png','7.PNG','Base64EncodedStringForVideo',2),(5,'123456089115','Base64EncodedStringForAddressProofPic','EKYC PENDING','ABCDK1235F','Base64EncodedStringForPanPic','Base64EncodedStringForProfilePic','Base64EncodedStringForVideo',4),(6,'123456123465','3bd25d82-1d60-4df0-941c-48f809e3ea97.png','APROVAL PENDING','CFLPV2867J','f237ecaf-7b25-4012-b6e1-b88056c81b6e.png','00779e45-9556-41e6-afbb-ea58e93b488f.png','c8c7efb9-7856-444b-bb77-8a73d510c135.webm',14),(10,'123123123132','aa1ff40f-3c90-4b9e-9648-0d262f29de1a.png','APROVAL PENDING','CFLPV2869J','dff7ed43-f420-4ed5-b35b-e21f790f34c0.png','4a1694e6-66b3-4045-8428-319a75bec0b4.png','c3c8eb48-636d-4eab-a1f8-9700de83aea1.webm',15),(11,'123456789123','5e4b68fe-a8c4-4d2d-a088-bfb6cb0634dc.png','APROVED','CFLPV2867H','117ed163-a76c-4d3c-a219-a94969dcfa60.png','a7f3da39-489b-4460-a719-0609286f48a3.png','5b7809ca-dd0d-4b00-88a1-31d8a29a941e.webm',16),(12,'13456789123','94fcce6c-57f6-481f-ac1f-764642be04be.png','APROVED','CFLPV2860J','cacfd449-3538-4ed8-8869-b03c8c60122d.png','1795297b-580b-4628-a653-abd09e936909.png','ef949afd-d5f6-4abc-a4fb-4eb9127587b5.webm',17),(15,'123956789123','cac28a08-9a06-4237-8385-bbc1afc8cd86.PNG','APROVED','AJLPK2867J','748b396d-1bdc-4d5b-ac05-f0c0c2c5eff2.png','4188344c-45a9-4d26-b836-7e98b9735078.PNG','312f1b1d-1ea5-41c2-9d41-7a3c62c1b55f.webm',18),(16,'987451351846','4967b19f-20ff-418b-b16e-69a920ba95b6.png','APROVED','KFLPV2867J','11a49cfc-7b59-49e3-a017-7aeffcb81a68.PNG','18899860-e829-4371-92b6-3d84ab06b434.PNG','ccbc9c4d-4621-4803-95fd-f8fb7e16cc86.webm',19),(17,'123479531846','0807191c-1b3e-4223-b229-c92fe21bf492.png','APROVED','CULPV2867J','f99880d7-7dfb-4436-899f-8fefbd1914bb.PNG','0be1c853-f3b3-48b6-a2f7-33081c9b4d57.PNG','73a29c9c-e8e1-4caa-85f7-c3fac1a71b4d.webm',20),(18,'123450978654','b65469ad-d28d-4015-a8af-7d6c4a86b751.PNG','APROVED','CPLPV2867J','f1c01623-25db-4a31-b167-b603e520a799.png','83ef032c-ad89-4f13-8ee2-3439243bde4b.png','7f18dbeb-65ef-4448-be09-b71aa0dd2245.webm',21);
/*!40000 ALTER TABLE `ekyc_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `amount` int NOT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `postal_code` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `delivery_date` date DEFAULT NULL,
  `order_date` date DEFAULT NULL,
  `order_status` varchar(255) DEFAULT NULL,
  `razor_pay_id` varchar(255) NOT NULL,
  `profile_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKe473rc0tqp27d8dbaav6m6anf` (`profile_id`),
  CONSTRAINT `FKeieprmmaadhys18lur996ikv4` FOREIGN KEY (`profile_id`) REFERENCES `profiles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,3500,'New York','USA','10001','NY','Main Street',NULL,'2024-12-22','KYC PENDING','rzp_test_12345ABCDEFGHI',NULL),(2,2500,'New York','USA','10001','NY','Main Street',NULL,'2024-12-22','KYC PENDING','rzp_test_12345ABCDEFG',NULL),(3,2500,'New York','USA','10001','NY','Main Street',NULL,'2024-12-22','KYC PENDING','rzp_test_12345ABCDEF',NULL),(4,0,'New York','USA','10001','NY','Main Street',NULL,'2024-12-22','APROVAL PENDING','rzp_test_12345ABCDEFg',2),(6,25000,'New York','USA','10001','NY','Main Street','2024-12-26','2024-12-23','DELIVERED','rzp_test_12345ABCDEFk',1),(8,25000,'New York','USA','10001','NY','Main Street',NULL,'2024-12-23','KYC PENDING','rzp_test_12345ABCDEFkv',4),(10,25000,'New York','USA','10001','NY','Main Street',NULL,'2024-12-24','KYC PENDING','rzp_test_12345ABCDEFkv',7),(11,2775,'Angul District','India','751024','Odisha','Room no. -C-215, hostel kp-9c ,kiit , patia, bhubaneswar',NULL,'2024-12-24','KYC PENDING','order_Pb5Ny49NkZp7Cq',10),(12,2775,'New Delhi','India','831011','Delhi','818 ,B/BLOCK ,MANBODH BASTI , NEAR HERO HONDA SERVICE CENTER, SONARI , JAMSHEDPUR.',NULL,'2024-12-24','KYC PENDING','order_Pb5fAB4dr5sPfp',12),(13,2775,'New Delhi','India','831011','Delhi','818 ,B/BLOCK ,MANBODH BASTI , NEAR HERO HONDA SERVICE CENTER, SONARI , JAMSHEDPUR.','2024-12-26','2024-12-25','DELIVERED','order_PbT1S9hquPxops',13),(14,2775,'Baragarh','India','751024','Odisha','Room no. -C-215, hostel kp-9c ,kiit , patia, bhubaneswar',NULL,'2024-12-25','KYC PENDING','order_PbTeCNj6FaKjlY',14),(15,2775,'Shillong','India','751024','Meghalaya','Room no. -C-215, hostel kp-9c ,kiit , patia, bhubaneswar',NULL,'2024-12-27','KYC PENDING','order_Pc5lV5GYSms694',15),(16,2775,'Balugaon','India','751024','Odisha','Room no. -C-215, hostel kp-9c ,kiit , patia, bhubaneswar',NULL,'2025-01-07','KYC PENDING','order_PgdxAngIXu4gGA',16),(17,2775,'Angul','India','751024','Odisha','Room no. -C-215, hostel kp-9c ,kiit , patia, bhubaneswar',NULL,'2025-01-07','KYC PENDING','order_Pge3ivHMtQBLMk',17),(18,2775,'Balasore','India','751024','Odisha','Room no. -C-215, hostel kp-9c ,kiit , patia, bhubaneswa',NULL,'2025-01-08','KYC PENDING','order_Ph2mAErFENm6fk',18),(19,2775,'Angul District','India','751024','Odisha','Room no. -C-215, hostel kp-9c ,kiit , patia, bhubaneswar',NULL,'2025-01-09','KYC PENDING','order_PhFbHrKfSldP0j',19),(20,2775,'Banki','India','751024','Odisha','Room no. -C-215, hostel kp-9c ,kiit , patia, bhubaneswar',NULL,'2025-01-09','KYC PENDING','order_PhJbkixauNyuCL',20),(21,2775,'Bhubaneshwar','India','751024','Odisha','818 ,B/BLOCK ,MANBODH BASTI , NEAR HERO HONDA SERVICE CENTER, SONARI , JAMSHEDPUR.',NULL,'2025-01-11','KYC PENDING','order_PiEZx3FfHzBlPu',21);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profiles`
--

DROP TABLE IF EXISTS `profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profiles` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `postal_code` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `street` varchar(255) DEFAULT NULL,
  `dob` varchar(255) DEFAULT NULL,
  `epin` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK410q61iev7klncmpqfuo85ivh` (`user_id`),
  CONSTRAINT `FK410q61iev7klncmpqfuo85ivh` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profiles`
--

LOCK TABLES `profiles` WRITE;
/*!40000 ALTER TABLE `profiles` DISABLE KEYS */;
INSERT INTO `profiles` VALUES (1,'Jamshedpur','India','831011','Jharkhand','123 ,Main Street','1990-01-01','123456','Raj kumar','Male','9876543210',1),(2,'Springfield','USA','62704','Illinois','123 Main St','1990-01-01','123456','John Doe','Male','9876543210',1),(4,'Springfield','USA','62704','Illinois','123 Main St','1990-01-01','123456','John Doe','Male','9876543210',NULL),(5,'Springfield','USA','62704','Illinois','123 Main St','1990-01-01','123456','John Doe','Male','9876543210',NULL),(6,'Springfield','USA','62704','Illinois','123 Main St','1990-01-01','123456','John Doe','Male','9876543210',5),(7,'Springfield','USA','62704','Illinois','123 Main St','1990-01-01','123456','John Doe','Male','9876543210',5),(8,'Angul District','India','751024','Odisha','Room no. -C-215, hostel kp-9c ,kiit , patia, bhubaneswar','2024-12-05',NULL,'HIMANSHU PRASAD','Male','917761041720',14),(9,'Angul District','India','751024','Odisha','Room no. -C-215, hostel kp-9c ,kiit , patia, bhubaneswar','2024-12-05',NULL,'HIMANSHU PRASAD','Male','917761041720',14),(10,'Angul District','India','751024','Odisha','Room no. -C-215, hostel kp-9c ,kiit , patia, bhubaneswar','2024-12-05',NULL,'HIMANSHU PRASAD','Male','917761041720',14),(11,'Barbil','India','751024','Odisha','Room no. -C-215, hostel kp-9c ,kiit , patia, bhubaneswar','2024-12-01',NULL,'HIMANSHU PRASAD','Male','917761057471',14),(12,'New Delhi','India','831011','Delhi','818 ,B/BLOCK ,MANBODH BASTI , NEAR HERO HONDA SERVICE CENTER, SONARI , JAMSHEDPUR.','2024-12-01','123456','HIMANSHU PRASAD','Male','917761057471',14),(13,'Athagarh','India','751024','Odisha','Room no. -C-215, hostel kp-9c ,kiit , patia, bhubaneswar','2002-05-20',NULL,'Himanshu Prasad','TranGender','917761054771',1),(14,'Baragarh','India','751024','Odisha','Room no. -C-215, hostel kp-9c ,kiit , patia, bhubaneswar','2024-12-02','123456','Himanshu Prasad','Male','917761057471',1),(15,'Shillong','India','751024','Meghalaya','Room no. -C-215, hostel kp-9c ,kiit , patia, bhubaneswar','2003-01-01','123456','Raj Kumar','Female','919835545018',18),(16,'Balugaon','India','751024','Odisha','Room no. -C-215, hostel kp-9c ,kiit , patia, bhubaneswar','2025-01-01','123456','HIMANSHU PRASAD','Male','919931546228',19),(17,'Angul','India','751024','Odisha','Room no. -C-215, hostel kp-9c ,kiit , patia, bhubaneswar','2023-02-01','123456','HIMA','Male','918976542132',19),(18,'Balasore','India','751024','Odisha','Room no. -C-215, hostel kp-9c ,kiit , patia, bhubaneswa','2002-06-12','123456','Priya Kumari','Female','918987664371',20),(19,'Angul District','India','751024','Odisha','Room no. -C-215, hostel kp-9c ,kiit , patia, bhubaneswar','2025-01-10','123456','jiya','Female','918786754694',21),(20,'Banki','India','751024','Odisha','Room no. -C-215, hostel kp-9c ,kiit , patia, bhubaneswar','2025-01-18','123456','ishita vera','Female','919876325145',22),(21,'Bhubaneshwar','India','751024','Odisha','818 ,B/BLOCK ,MANBODH BASTI , NEAR HERO HONDA SERVICE CENTER, SONARI , JAMSHEDPUR.','2002-04-10','123456','Raj Kumar','Male','917761057471',23);
/*!40000 ALTER TABLE `profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'ADMIN'),(2,'USER'),(3,'EMPLOYEE'),(4,'DATABASE'),(5,'KYC');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles_seq`
--

DROP TABLE IF EXISTS `roles_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles_seq`
--

LOCK TABLES `roles_seq` WRITE;
/*!40000 ALTER TABLE `roles_seq` DISABLE KEYS */;
INSERT INTO `roles_seq` VALUES (1);
/*!40000 ALTER TABLE `roles_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services_plan`
--

DROP TABLE IF EXISTS `services_plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services_plan` (
  `service_id` bigint NOT NULL AUTO_INCREMENT,
  `calls` varchar(255) NOT NULL,
  `data` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `sms` varchar(255) NOT NULL,
  PRIMARY KEY (`service_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services_plan`
--

LOCK TABLES `services_plan` WRITE;
/*!40000 ALTER TABLE `services_plan` DISABLE KEYS */;
INSERT INTO `services_plan` VALUES (1,'Unlimited','1.5GB/DAY','299','100 SMS/DAY');
/*!40000 ALTER TABLE `services_plan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sims`
--

DROP TABLE IF EXISTS `sims`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sims` (
  `sim_id` bigint NOT NULL AUTO_INCREMENT,
  `ciid` varchar(20) NOT NULL,
  `imsi` varchar(20) NOT NULL,
  `add_date` datetime(6) DEFAULT NULL,
  `available` bit(1) DEFAULT NULL,
  `issue_date` datetime(6) DEFAULT NULL,
  `profile_name` varchar(255) DEFAULT NULL,
  `sim_number` varchar(10) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `service_id` bigint DEFAULT NULL,
  `profile_id` bigint DEFAULT NULL,
  PRIMARY KEY (`sim_id`),
  UNIQUE KEY `UKg58hgxtwsjlr3wuuot5siui2v` (`ciid`),
  UNIQUE KEY `UKqa9lf5wn8g9lh5nctp5pgb87y` (`imsi`),
  UNIQUE KEY `UKew6qbrosxu91ss9ho8wkrj7kv` (`profile_id`),
  KEY `FKn59dd273prp5yx1n0qlv68qoe` (`service_id`),
  CONSTRAINT `FKe2qk7q6u3sl1851nw4k4yjn7n` FOREIGN KEY (`profile_id`) REFERENCES `profiles` (`id`),
  CONSTRAINT `FKn59dd273prp5yx1n0qlv68qoe` FOREIGN KEY (`service_id`) REFERENCES `services_plan` (`service_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sims`
--

LOCK TABLES `sims` WRITE;
/*!40000 ALTER TABLE `sims` DISABLE KEYS */;
INSERT INTO `sims` VALUES (1,'UNIQUE-CIID-12345','UNIQUE-IMSI-67890','2024-12-23 13:21:38.290000',_binary '\0','2024-12-21 05:30:00.000000','John Doe','1234567890','Active',1,1),(4,'UNIQUE-CIID-22345','UNIQUE-IMSI-57890','2024-12-23 13:24:36.309000',_binary '\0','2024-12-21 05:30:00.000000','John Doe','1234567890','Active',1,2),(6,'UNIQUE-CIID-92345','UNIQUE-IMSI-97890','2024-12-23 21:16:02.392000',_binary '\0','2024-12-21 05:30:00.000000','John Doe','1234567890','Active',1,5),(7,'UNIQUE-CIID-99345','UNIQUE-IMSI-99890','2024-12-23 22:53:25.229000',_binary '\0','2024-12-23 22:56:09.942000','John Doe','1234567890','Inactive',NULL,4),(8,'UNIQUE-CIID-99945','UNIQUE-IMSI-99810','2024-12-23 22:57:57.283000',_binary '',NULL,'John Doe','1234567890',NULL,NULL,NULL);
/*!40000 ALTER TABLE `sims` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email_id` varchar(255) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `role_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKp56c1712k691lhsyewcssf40f` (`role_id`),
  CONSTRAINT `FKp56c1712k691lhsyewcssf40f` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Firtemail1@gmail.com','Demo',2),(2,'himanshuprasad2705@gmail.com','Himanshu Prasad',1),(3,'hipr27052002@gmail.com','Himanshu Prasad',2),(4,'hipri27052002@gmail.com','Priyanshu Prasad',2),(5,'hi27@gmail.com','Rishu Kumar',4),(7,'higgdfgdf27@gmail.com','Rishu Raj',2),(8,'hipr27052002gtc@gmail.com','HIMANSHU PRASAD',2),(9,'hikggdfgdf27@gmail.com','Rishu Raj',2),(10,'hi9kggdfgdf27@gmail.com','Rishu Raj',2),(11,'sgaewer2@gmail.com','HIMANSHU PRASAD',2),(12,'cacsdf@gmail.com','HIMANSHU PRASAD',2),(13,'pjojn@gmail.com','HIMANSHU PRASAD',2),(14,'vbdysdr@gmail.com','HIMANSHU PRASAD',2),(15,'hipr27052dsfs002@gmail.com','HIMANSHU PRASAD',2),(16,'hipr227052002@gmail.com','HIMANSHU PRASAD',2),(17,'hipr97827052002@gmail.com','HIMANSHU PRASAD',2),(18,'hipr27052002lk@gmail.com','Himanshu Prasad',2),(19,'dinapriasad2716@gmail.com','HIMANSHU PRASAD',2),(20,'hipr9827052002@gmail.com','Raj Kumar',2),(21,'dinaprasad2716@gmail.com','Raj Kumar',2),(22,'ishitaverma458@gmail.com','Ishita Verma',2),(23,'Raj123@gmail.com','Raj Kumar',2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-19 22:48:13
