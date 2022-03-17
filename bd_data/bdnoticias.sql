-- phpMyAdmin SQL Dump
-- version 5.0.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-03-2022 a las 21:53:30
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
(1, 'Empresa los gonzales', 'Empresa de venta de carros usados ', 1, 'asdadsahdashdsahdjkashdkas', 1),
(2, 'Empresa Huadalajara', 'Empresa de venta de inmuebles', 0, 'http://usuario.com', 0),
(3, 'hjshfkjdshfjksdhfksd', 'fsdhfjksdhfjksdhf', 0, 'dfhsdjhfkjsdhfksd', 1),
(4, 'hjshfkjdshfjksdhfksd', 'fsdhfjksdhfjksdhf', 0, 'dfhsdjhfkjsdhfksd', 1),
(5, 'hjshfkjdshfjksdhfksd', 'fsdhfjksdhfjksdhf', 0, 'dfhsdjhfkjsdhfksd', 1),
(6, 'hjshfkjdshfjksdhfksd', 'fsdhfjksdhfjksdhf', 0, 'dfhsdjhfkjsdhfksd', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `participante`
--
ALTER TABLE `participante`
  ADD PRIMARY KEY (`id_negocio`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `participante`
--
ALTER TABLE `participante`
  MODIFY `id_negocio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
