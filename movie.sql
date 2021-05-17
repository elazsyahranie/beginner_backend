-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 17, 2021 at 07:36 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jualkarcis`
--

-- --------------------------------------------------------

--
-- Table structure for table `movie`
--

CREATE TABLE `movie` (
  `movie_id` int(11) NOT NULL,
  `movie_name` varchar(150) NOT NULL,
  `movie_category` varchar(250) NOT NULL,
  `movie_release_date` date NOT NULL,
  `movie_image` varchar(100) NOT NULL,
  `movie_duration` varchar(255) NOT NULL,
  `movie_directed_by` varchar(255) NOT NULL,
  `movie_casts` varchar(255) NOT NULL,
  `movie_synopsis` varchar(255) NOT NULL,
  `movie_created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `movie_updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `movie`
--

INSERT INTO `movie` (`movie_id`, `movie_name`, `movie_category`, `movie_release_date`, `movie_image`, `movie_duration`, `movie_directed_by`, `movie_casts`, `movie_synopsis`, `movie_created_at`, `movie_updated_at`) VALUES
(1, 'Tenet', 'Action, Comedy', '2021-04-20', '2021-04-30T03-15-48.792Ztenet.png', '', 'Jon Watts', 'Tom Holland, Tobey Maguire, Elazar', '', '2021-04-08 09:37:19', '2021-04-14 07:09:25'),
(3, 'Spiderman Mulu Bosen', 'Action', '0000-00-00', '2021-05-03T06-49-48.543Zkeanu.png', '', '', '', '', '2021-04-09 11:25:49', NULL),
(7, 'Marvel', 'Action', '2021-04-09', '', '', '', '', '', '2021-04-09 14:07:33', NULL),
(8, 'Marvel', 'Action', '2021-04-09', '', '', '', '', '', '2021-04-09 14:11:27', NULL),
(9, 'Marvel', 'Action', '2021-04-09', '', '', '', '', '', '2021-04-09 14:13:02', NULL),
(10, 'Marvel', 'Action', '2021-04-09', '', '', '', '', '', '2021-04-09 14:14:13', NULL),
(11, 'Marvel', 'Action', '2021-04-09', '', '', '', '', '', '2021-04-09 14:28:32', NULL),
(12, 'Marvel', 'Action', '2021-04-09', '', '', '', '', '', '2021-04-13 11:15:46', '2021-04-13 11:15:46'),
(13, 'Marvel', 'Action', '2021-04-09', '', '', '', '', '', '2021-04-13 11:19:18', '2021-04-13 11:19:18'),
(14, 'Marvel', 'Action', '2021-04-09', '', '', '', '', '', '2021-04-13 11:19:41', '2021-04-13 11:19:41'),
(15, 'Marvel', 'Action', '2021-04-09', '', '', '', '', '', '2021-04-13 11:19:43', '2021-04-13 11:19:43'),
(16, 'Marvel', 'Action', '2021-04-09', '', '', '', '', '', '2021-04-13 11:20:52', '2021-04-13 11:20:52'),
(17, 'Marvel', 'Action', '2021-04-09', '', '', '', '', '', '2021-04-13 11:29:04', '2021-04-13 11:29:04'),
(18, 'Marvel', 'Action', '2021-04-09', '', '', '', '', '', '2021-04-13 11:30:51', '2021-04-13 11:30:51'),
(19, 'Pilem Serem', 'Comedy, Horror', '2021-04-13', '', '', '', '', '', '2021-04-13 13:31:07', '2021-04-13 13:31:07'),
(20, '', 'Drama', '1997-02-03', '', '', '', '', '', '2021-04-13 14:40:17', '2021-04-13 14:40:17'),
(21, 'Iron Man 3', 'Action, Comedy, Sci Fi', '2016-12-12', '', '', '', '', '', '2021-04-13 14:41:31', '2021-04-13 14:41:31'),
(22, 'Kesempurnaan Cinta The Movie', 'drama', '2021-04-13', '', '', '', '', '', '2021-04-13 15:23:26', '2021-04-13 15:23:26'),
(23, 'Nyoba Lawak ', 'Comedy', '2021-04-21', '', '02:35:54', '', '', '', '2021-04-14 07:17:07', NULL),
(24, 'Nyoba Lawak ', 'Comedy', '2021-04-21', '', '02:35:54', '', '', '', '2021-04-14 07:20:52', NULL),
(25, 'Mathematic', 'Drama', '2021-04-21', '', '02:35:54', '', '', 'Lorem ipsum dolor sit amet', '2021-04-14 09:17:34', NULL),
(26, '', '', '0000-00-00', '', '01:20:56', '', '', 'Dua mahasiswa terjebak di sebuah pulau yang dikabarkan angker. Namun mereka kemudian menyadari bahwa cerita mengenai pulau tersebut tidak seperti yang dibayangkan.', '2021-04-14 13:44:15', NULL),
(27, 'Spiderman Return', 'Action', '0000-00-00', '2021-04-27T08-28-09.427Zanother_spiderman.png', '', '', '', '', '2021-04-27 15:28:09', NULL),
(28, 'Spiderman Return', 'Action', '0000-00-00', '2021-04-27T08-28-55.915Zanother_spiderman.png', '', '', '', '', '2021-04-27 15:28:56', NULL),
(29, 'Spiderman Return', 'Action', '0000-00-00', '', '', '', '', '', '2021-04-27 16:07:44', NULL),
(30, 'Spiderman Return', 'Action', '0000-00-00', '', '', '', '', '', '2021-04-27 16:08:46', NULL),
(31, 'Spiderman Return', 'Action', '0000-00-00', '', '', '', '', '', '2021-04-27 16:09:19', NULL),
(32, 'Spiderman Mulu Bosen', 'Action', '0000-00-00', '', '', '', '', '', '2021-04-28 15:10:05', NULL),
(33, 'Spiderman Mulu Bosen', 'Action', '0000-00-00', '2021-04-28T08-16-27.013Zanother_spiderman.png', '', '', '', '', '2021-04-28 15:16:27', NULL),
(34, 'Spiderman Mulu Bosen', 'Action', '0000-00-00', '2021-04-28T08-18-13.078Zanother_spiderman.png', '', '', '', '', '2021-04-28 15:18:13', NULL),
(35, 'Spiderman Lain', 'Action', '0000-00-00', '2021-05-03T06-53-55.494Zellipse_11.png', '', '', '', '', '2021-05-03 13:53:55', NULL),
(36, 'Tetot', 'Action', '0000-00-00', '2021-05-03T09-02-07.804Ztenet.png', '', '', '', '', '2021-05-03 16:02:07', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `movie`
--
ALTER TABLE `movie`
  ADD PRIMARY KEY (`movie_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `movie`
--
ALTER TABLE `movie`
  MODIFY `movie_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
