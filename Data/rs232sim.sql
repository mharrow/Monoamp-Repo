-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: May 02, 2016 at 06:38 PM
-- Server version: 5.5.49-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `rs232sim`
--

-- --------------------------------------------------------

--
-- Table structure for table `zones`
--

CREATE TABLE IF NOT EXISTS `zones` (
  `AD` int(11) DEFAULT NULL,
  `PA` int(11) DEFAULT NULL,
  `PR` int(11) DEFAULT NULL,
  `MU` int(11) DEFAULT NULL,
  `DT` int(11) DEFAULT NULL,
  `VO` int(11) DEFAULT NULL,
  `TR` int(11) DEFAULT NULL,
  `BS` int(11) DEFAULT NULL,
  `BL` int(11) DEFAULT NULL,
  `CH` int(11) DEFAULT NULL,
  `KP` int(11) DEFAULT NULL,
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `zones`
--

INSERT INTO `zones` (`AD`, `PA`, `PR`, `MU`, `DT`, `VO`, `TR`, `BS`, `BL`, `CH`, `KP`, `id`) VALUES
(11, 0, 1, 0, 0, 14, 8, 10, 10, 1, 1, 1),
(12, 0, 1, 0, 0, 13, 9, 9, 10, 4, 1, 2),
(13, 0, 1, 0, 0, 21, 7, 7, 10, 3, 1, 3),
(14, 0, 1, 0, 0, 21, 7, 7, 10, 6, 1, 4),
(15, 0, 1, 0, 0, 18, 7, 7, 10, 5, 1, 5),
(16, 0, 1, 0, 0, 19, 7, 7, 10, 2, 1, 6);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
