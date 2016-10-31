-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Oct 30, 2016 at 11:29 PM
-- Server version: 5.5.52-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `madAmp`
--

-- --------------------------------------------------------

--
-- Table structure for table `attributeControlMode`
--

CREATE TABLE IF NOT EXISTS `attributeControlMode` (
  `slidersOn` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`slidersOn`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='toggle slider controls or button controls';

--
-- Dumping data for table `attributeControlMode`
--

INSERT INTO `attributeControlMode` (`slidersOn`) VALUES
(0);

-- --------------------------------------------------------

--
-- Table structure for table `attributes`
--

CREATE TABLE IF NOT EXISTS `attributes` (
  `control` text NOT NULL,
  `visibleStatus` tinyint(1) NOT NULL,
  `displayName` varchar(30) DEFAULT NULL,
  `upIcon` varchar(30) DEFAULT NULL,
  `downIcon` varchar(30) DEFAULT NULL,
  `min` int(11) DEFAULT NULL,
  `max` int(11) DEFAULT NULL,
  `type` varchar(30) DEFAULT NULL,
  `offset` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `attributes`
--

INSERT INTO `attributes` (`control`, `visibleStatus`, `displayName`, `upIcon`, `downIcon`, `min`, `max`, `type`, `offset`) VALUES
('TR', 1, 'Treble', 'fa fa-chevron-up', 'fa fa-chevron-down', 0, 14, 'range', 7),
('BS', 1, 'Bass', 'fa fa-chevron-up', 'fa fa-chevron-down', 0, 14, 'range', 7),
('BL', 1, 'Balance', 'fa fa-chevron-right', 'fa fa-chevron-left', 0, 20, 'range', 10),
('VO', 1, 'Volume', 'fa fa-volume-up', 'fa fa-volume-down', 0, 38, 'range', 0),
('CH', 1, 'Source', NULL, NULL, 1, 6, 'dropDown', 0),
('PR', 1, 'Power', NULL, NULL, 0, 1, 'toggle', 0),
('MU', 1, 'Mute', NULL, NULL, 0, 1, 'toggle', 0);

-- --------------------------------------------------------

--
-- Table structure for table `sources`
--

CREATE TABLE IF NOT EXISTS `sources` (
  `sourceName` text NOT NULL,
  `unitAddress` int(11) NOT NULL,
  `positionAddress` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sources`
--

INSERT INTO `sources` (`sourceName`, `unitAddress`, `positionAddress`) VALUES
('TurnTable', 0, 1),
('Dvd Player', 0, 2),
('Ipod2', 0, 3),
('BlueRay Player', 0, 4),
('Bluetooth', 0, 5),
('Source-6', 0, 6);

-- --------------------------------------------------------

--
-- Table structure for table `zones`
--

CREATE TABLE IF NOT EXISTS `zones` (
  `zoneName` text CHARACTER SET utf8 NOT NULL,
  `unitAddress` int(1) NOT NULL,
  `positionAddress` int(1) NOT NULL,
  `activeStatus` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `zones`
--

INSERT INTO `zones` (`zoneName`, `unitAddress`, `positionAddress`, `activeStatus`) VALUES
('Master Bedroom', 1, 1, 1),
('Living Room', 1, 2, 1),
('Dining Room', 1, 3, 1),
('Rec Room', 1, 4, 1),
('Lou''s Room', 1, 5, 1),
('Office', 1, 6, 1),
('Deck', 2, 1, 1),
('Bar', 2, 2, 1),
('Rec Room', 2, 3, 1),
('Garage', 2, 4, 1),
('Zone 25', 2, 5, 1),
('Zone 26', 2, 6, 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
