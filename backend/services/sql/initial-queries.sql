-- Customers tables  
CREATE TABLE IF NOT EXISTS `customer_identifier` (
  `customer_id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_email` varchar(255) NOT NULL,
  `customer_phone_number` varchar(255) NOT NULL,
  `customer_added_date` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `customer_hash` varchar(255) NOT NULL,
  PRIMARY KEY (customer_id),
  UNIQUE (customer_email)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `customer_info` (
  `customer_info_id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL, 
  `customer_first_name` varchar(255) NOT NULL,
  `customer_last_name` varchar(255) NOT NULL,
  `active_customer_status` int(11) NOT NULL,
  PRIMARY KEY (customer_info_id),
  FOREIGN KEY (customer_id) REFERENCES customer_identifier(customer_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `customer_vehicle_info` (
  `vehicle_id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL, 
  `vehicle_year` int(11) NOT NULL,
  `vehicle_make` varchar(255) NOT NULL,
  `vehicle_model` varchar(255) NOT NULL,
  `vehicle_type` varchar(255) NOT NULL,
  `vehicle_mileage` int(11) NOT NULL, 
  `vehicle_tag` varchar(255) NOT NULL,
  `vehicle_serial` varchar(255) NOT NULL,
  `vehicle_color` varchar(255) NOT NULL,
  PRIMARY KEY (vehicle_id),
  FOREIGN KEY (customer_id) REFERENCES customer_identifier(customer_id)
) ENGINE=InnoDB;

-- Company tables 
CREATE TABLE IF NOT EXISTS `company_roles` (
  `company_role_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_role_name` varchar(255) NOT NULL,
  PRIMARY KEY (company_role_id),
  UNIQUE (company_role_name)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `common_services` (
  `service_id` int(11) NOT NULL AUTO_INCREMENT,
  `service_name` varchar(255) NOT NULL,
  `service_description` TEXT,
  PRIMARY KEY (service_id)
) ENGINE=InnoDB;


-- Employee tables 
CREATE TABLE IF NOT EXISTS `employee` (
  `employee_id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_email` varchar(255) NOT NULL,
  `active_employee` int(11) NOT NULL,
  `added_date` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (employee_id), 
  UNIQUE (employee_email)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `employee_info` (
  `employee_info_id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `employee_first_name` varchar(255) NOT NULL,
  `employee_last_name` varchar(255) NOT NULL,
  `employee_phone` varchar(255) NOT NULL,
  PRIMARY KEY (employee_info_id),
  FOREIGN KEY (employee_id) REFERENCES employee(employee_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `employee_pass` (
  `employee_pass_id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `employee_password_hashed` varchar(255) NOT NULL,
  PRIMARY KEY (employee_pass_id),
  FOREIGN KEY (employee_id) REFERENCES employee(employee_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `employee_role` (
  `employee_role_id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `company_role_id` int(11) NOT NULL,
  PRIMARY KEY (employee_role_id),
  FOREIGN KEY (employee_id) REFERENCES employee(employee_id),
  FOREIGN KEY (company_role_id) REFERENCES company_roles(company_role_id)
) ENGINE=InnoDB;

-- Order tables  
CREATE TABLE IF NOT EXISTS `orders` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `vehicle_id` int(11) NOT NULL,
  `order_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `active_order` int(11) NOT NULL,
  `order_hash` varchar(255) NOT NULL,
  PRIMARY KEY (order_id),
  FOREIGN KEY (employee_id) REFERENCES employee(employee_id), 
  FOREIGN KEY (customer_id) REFERENCES customer_identifier(customer_id),
  FOREIGN KEY (vehicle_id) REFERENCES customer_vehicle_info(vehicle_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `order_info` (
  `order_info_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `order_total_price` int(11) NOT NULL,
  `estimated_completion_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `completion_date` DATETIME,
  `additional_request` TEXT,
  `notes_for_internal_use` TEXT,
  `notes_for_customer` TEXT,
  `additional_requests_completed` int(11) NOT NULL,
  PRIMARY KEY (order_info_id),
  FOREIGN KEY (order_id) REFERENCES orders(order_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `order_services` (
  `order_service_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `service_completed` int(11) NOT NULL,
  PRIMARY KEY (order_service_id),
  FOREIGN KEY (order_id) REFERENCES orders(order_id),
  FOREIGN KEY (service_id) REFERENCES common_services(service_id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS `order_status` (
  `order_status_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `order_status` int(11) NOT NULL,
  PRIMARY KEY (order_status_id),
  FOREIGN KEY (order_id) REFERENCES orders(order_id)
) ENGINE=InnoDB;

-- Add the roles to the database 
INSERT INTO company_roles (company_role_name)
VALUES ('Employee'), ('Manager'), ('Admin');

-- This is the admin account 
INSERT INTO employee (employee_email, active_employee, added_date)
VALUES ('admin@admin.com', 1, CURRENT_TIMESTAMP);

INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone)
VALUES (1, 'Admin', 'Admin', 555-555-5555); 

-- Password is 123456
INSERT INTO employee_pass (employee_id, employee_password_hashed)
VALUES (1, '$2b$10$B6yvl4hECXploM.fCDbXz.brkhmgqNlawh9ZwbfkFX.F3xrs.15Xi');  

INSERT INTO employee_role (employee_id, company_role_id)
VALUES (1, 3); 

***********************************************************

-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Aug 20, 2024 at 04:53 PM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `abegaragecrew`
--

-- --------------------------------------------------------

--
-- Table structure for table `common_services`
--

CREATE TABLE `common_services` (
  `service_id` int(11) NOT NULL,
  `service_name` varchar(255) NOT NULL,
  `service_description` text,
  `active` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `common_services`
--

INSERT INTO `common_services` (`service_id`, `service_name`, `service_description`, `active`) VALUES
(1, 'Oil change', 'Some description about the oil change', 1),
(2, 'Spark plug replacement', 'Spark plugs are a small part that can cause huge problems. Teir job is to ignite the fuel in your engine, helping it start.', 1),
(3, 'Fuel Cap tightening', 'Loose fuel caps are actually a main reason why the \"check engine\" light in a car comes on.', 1),
(4, 'Oxygen Sensor replacement', 'Oxygen sensors measure the concentration of oxygen in the exhaust gabs in order to optimize engine performance and emissions.', 1),
(5, 'Brake work', 'We all know why brake work is important, especially because one quarter of all Canadian car accidents are caused by a failure ot stop.', 1),
(6, 'Tire repairs and changes', 'Without good, inflated tires, you loose speed,control, and fuel efficiency, hence the need to get them patched if there\'s a leak (for example, if you run over a nail), or replaced if they\'re too worn.', 1),
(7, 'The Ignition System', 'A car\'s Ignition system includes its battery, starter, and the iginition itself.', 1),
(8, 'Programing the camera software', 'Without good, inflated tires, you loose speed, control, and fuel efficiency, hence the need to ger them patched if there\'s a leak (for ecample, if you run over a nail), or replaced if they\'re too worn.', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `common_services`
--
ALTER TABLE `common_services`
  ADD PRIMARY KEY (`service_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `common_services`
--
ALTER TABLE `common_services`
  MODIFY `service_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
