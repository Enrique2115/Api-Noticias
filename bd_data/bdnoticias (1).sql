-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-03-2022 a las 07:07:06
-- Versión del servidor: 10.4.14-MariaDB
-- Versión de PHP: 7.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bdnoticias`
--
CREATE DATABASE IF NOT EXISTS `bdnoticias` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `bdnoticias`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `participante`
--

CREATE TABLE `participante` (
  `id_negocio` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripccion` varchar(100) NOT NULL,
  `puntaje` int(11) NOT NULL,
  `url` varchar(250) NOT NULL,
  `stado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `participante`
--

INSERT INTO `participante` VALUES
(1, 'Empresa los gonzales', 'Empresa de venta de carros usados ', 2, 'asdadsahdashdsahdjkashdkas', 1),
(2, 'Empresa Huadalajara', 'Empresa de venta de inmuebles', 0, 'http://usuario.com', 0),
(3, 'Empresa don juan', 'Empresa de venta de inmuebles', 1, 'http://usuario.com', 1),
(4, 'hjshfkjdshfjksdhfksd', 'fsdhfjksdhfjksdhf', 0, 'dfhsdjhfkjsdhfksd', 1),
(5, 'hjshfkjdshfjksdhfksd', 'fsdhfjksdhfjksdhf', 0, 'dfhsdjhfkjsdhfksd', 1),
(6, 'hjshfkjdshfjksdhfksd', 'fsdhfjksdhfjksdhf', 0, 'dfhsdjhfkjsdhfksd', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `votaciones`
--

CREATE TABLE `votaciones` (
  `id_votaciones` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  `Hors_filter` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `votaciones`
--

INSERT INTO `votaciones` VALUES
(1, '2022-03-17 17:41:31', 24),
(2, '2022-03-17 20:57:55', 24),
(3, '2022-03-17 22:13:00', 24),
(9, '2022-03-18 00:48:00', 24),
(10, '2022-03-18 00:48:00', 24);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `votaci_parti`
--

CREATE TABLE `votaci_parti` (
  `id_vot_parti` int(11) NOT NULL,
  `id_parti` int(11) NOT NULL,
  `id_votac` int(11) NOT NULL,
  `code_usser` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `votaci_parti`
--

INSERT INTO `votaci_parti` VALUES
(1, 1, 3, 'HFJHSDJKFHKJSDHFJKDSHFJKSDHJKFHSDJKFHJKSDHFKJDSHFJKDSHFKSDHFJDKSHFJKDSHFJKDHFJKDSHFKDSJF'),
(10, 1, 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo5NjkyODAyNTUsIm5vbWJyZSI6ImJyYWRjYXIiLCJlbWFpbCI6InVjdjIwMjFAZW1haWwuY29tIn0sImlhdCI6MTY0NzU4MDY2OX0.HjeeNOJSlubhFKak0NzsDwKKE1okk0_5V2PCHWtmk7o'),
(11, 1, 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo5NjkyODAyNTUsIm5vbWJyZSI6ImJyYWRjYXIiLCJlbWFpbCI6InVjdjIwMjFAZW1haWwuY29tIn0sImlhdCI6MTY0NzU4MDY4NX0.uhfBZIeFj2h_oo2YgA_p61pk8SwQkM5x9R21n7TBaRY'),
(13, 2, 3, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo5NjkyODAyNTUsIm5vbWJyZSI6ImJyYWRjYXIiLCJlbWFpbCI6InVjdjIwMjFAZW1haWwuY29tIn0sImlhdCI6MTY0NzU4MTE1OX0.yE3PMg685_s9oZASEWNo7cGu6Rg0tvRfW07T9pQaTXQ'),
(14, 3, 10, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo5NjkyODAyNTUsIm5vbWJyZSI6ImJyYWRjYXIiLCJlbWFpbCI6InVjdjIwMjFAZW1haWwuY29tIn0sImlhdCI6MTY0NzU4MzMyMX0.EaegIXk7aXXvzt-XxLMZqrSsFStBGsgjaMkmD1trvmo'),
(15, 1, 10, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo5NjkyODAyNTUsIm5vbWJyZSI6ImJyYWRjYXIiLCJlbWFpbCI6InVjdjIwMjFAZW1haWwuY29tIn0sImlhdCI6MTY0NzU4MTE1OX0.yE3PMg685_s9oZASEWNo7cGu6Rg0tvRfW07T9pQaTXQ'),
(16, 1, 10, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo5NjkyODAyNTUsIm5vbWJyZSI6ImJyYWRjYXIiLCJlbWFpbCI6InVjdjIwMjFAZW1haWwuY29tIn0sImlhdCI6MTY0NzU4MDY2OX0.HjeeNOJSlubhFKak0NzsDwKKE1okk0_5V2PCHWtmk7o');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `participante`
--
ALTER TABLE `participante`
  ADD PRIMARY KEY (`id_negocio`);

--
-- Indices de la tabla `votaciones`
--
ALTER TABLE `votaciones`
  ADD PRIMARY KEY (`id_votaciones`);

--
-- Indices de la tabla `votaci_parti`
--
ALTER TABLE `votaci_parti`
  ADD PRIMARY KEY (`id_vot_parti`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `participante`
--
ALTER TABLE `participante`
  MODIFY `id_negocio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `votaciones`
--
ALTER TABLE `votaciones`
  MODIFY `id_votaciones` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `votaci_parti`
--
ALTER TABLE `votaci_parti`
  MODIFY `id_vot_parti` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
