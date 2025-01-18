-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 26, 2024 at 08:10 AM
-- Wersja serwera: 10.4.28-MariaDB
-- Wersja PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `matura`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `exercise`
--

CREATE TABLE `exercise` (
  `id` bigint(255) NOT NULL,
  `arkusz` varchar(999) NOT NULL,
  `link` varchar(999) NOT NULL,
  `dzial` varchar(999) NOT NULL,
  `png` varchar(999) NOT NULL,
  `answer` varchar(999) NOT NULL,
  `full_answer` varchar(9999) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Dumping data for table `exercise`
--

INSERT INTO `exercise` (`id`, `arkusz`, `link`, `dzial`, `png`, `answer`, `full_answer`) VALUES
(1, 'Arkusz maturalny matematyka 2024 czerwiec - poziom podstawowy', 'https://arkusze.pl/maturalne/matematyka-2024-czerwiec-matura-podstawowa.pdf', 'Liczby i zbiory', '1.png', 'D', '<p><strong>1. Obliczenie wartości \\(2^{-1}\\):</strong></p>\r\n    <p class=\"math\">\\[2^{-1} = \\frac{1}{2}\\]</p>\r\n    <p><strong>2. Obliczenie wartości \\(32^{\\frac{3}{5}}\\):</strong></p>\r\n    <p>Możemy zacząć od zapisania liczby 32 jako potęgi liczby 2:</p>\r\n    <p class=\"math\">\\[32 = 2^5\\]</p>\r\n    <p>Teraz podstawiamy tę wartość do wyrażenia \\(32^{\\frac{3}{5}}\\):</p>\r\n    <p class=\"math\">\\[32^{\\frac{3}{5}} = (2^5)^{\\frac{3}{5}}\\]</p>\r\n    <p>Korzystając z własności potęg, możemy pomnożyć wykładniki:</p>\r\n    <p class=\"math\">\\[(2^5)^{\\frac{3}{5}} = 2^{5 \\cdot \\frac{3}{5}} = 2^3\\]</p>\r\n    <p>A więc:</p><p class=\"math\">\\[2^3 = 8\\]</p>\r\n    <p><strong>3. Mnożenie uzyskanych wartości:</strong></p>\r\n    <p>Teraz mnożymy \\(\\frac{1}{2}\\) przez 8:</p>\r\n    <p class=\"math\">\\[\\frac{1}{2} \\cdot 8 = 4\\]</p>\r\n    <p>Podsumowując, wartość wyrażenia \\((2^{-1}) \\cdot (32^{\\frac{3}{5}})\\) wynosi \\(\\boxed{4}\\).</p>\r\n'),
(2, 'Arkusz maturalny matematyka 2024 czerwiec - poziom podstawowy', 'https://arkusze.pl/maturalne/matematyka-2024-czerwiec-matura-podstawowa.pdf', 'Liczby i zbiory', '2.png', 'AAA', 'AAA\r\nBBB\r\nCC\r\n'),
(3, 'Arkusz maturalny matematyka 2024 czerwiec - poziom podstawowy', 'https://arkusze.pl/maturalne/matematyka-2024-czerwiec-matura-podstawowa.pdf', 'Liczby i zbiory', '3.png', 'AAA', 'AAA\r\nBBB\r\nCC\r\n'),
(4, 'Arkusz maturalny matematyka 2024 czerwiec - poziom podstawowy', 'https://arkusze.pl/maturalne/matematyka-2024-czerwiec-matura-podstawowa.pdf', 'Liczby i zbiory', '4.png', 'AAA', 'AAA\r\nBBB\r\nCC\r\n'),
(5, 'Arkusz maturalny matematyka 2024 czerwiec - poziom podstawowy', 'https://arkusze.pl/maturalne/matematyka-2024-czerwiec-matura-podstawowa.pdf', 'Funkcje', '5.png', 'AAA', 'AAA\r\nBBB\r\nCC\r\n');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `favorites` varchar(255) DEFAULT '',
  `subscription` date NOT NULL DEFAULT current_timestamp(),
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_expires` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `favorites`, `subscription`, `reset_token`, `reset_expires`) VALUES
(4, 'kacper2019114@gmail.com', '$2y$10$1Ho3dNINnw72jl/SjxFy8eMiLUDsNIPLX5dp7/vzrQjRImWtQjfuG', ',matematyka 1 - zakres podstawowy i rozszerzony nowa era,matematyka 2 - zakres podstawowy i rozszerzony nowa era,matematyka 1 - zakres podstawowy nowa era,matematyka 2 - zakres podstawowy nowa era,matematyka 3 - zakres podstawowy nowa era', '0000-00-00', 'f286f6d4283cfde96b8b3b2b2fd7bc25cab9383bc0eb35b41f46ec00170d445cdba79f7e4658260b8811cd32b168fb411d4f', 1720358889),
(5, 'Kacper2021114@wp.pl', '$2y$10$Sco3jql34XZkcCigiFKmaeEPCvtNFtcJbCXYcABbOJs5lZN..F.pG', '', '0000-00-00', '73d4b0f67d5fd6ce93fdd04118fc2d63691a04377a8e7c9e165c93923f534f1c2486b6a422b121d31c6410d4c4773155be7d', 1720356539),
(11, 'test123@gmail.com', '$2y$10$kHVZB0Aer2JpHawip0eLeu6yqmV1pF6Mhj2SLPa9fGMh8njfao2ce', '', '2024-07-14', NULL, NULL);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `exercise`
--
ALTER TABLE `exercise`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `exercise`
--
ALTER TABLE `exercise`
  MODIFY `id` bigint(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
