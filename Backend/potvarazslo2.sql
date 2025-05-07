-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Máj 07. 20:35
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `potvarazslo2`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `bejegyzes`
--

CREATE TABLE `bejegyzes` (
  `bejegyzesID` int(11) NOT NULL,
  `cim` varchar(50) NOT NULL,
  `tartalom` text NOT NULL,
  `autoTipus` varchar(20) NOT NULL,
  `datum` datetime NOT NULL,
  `felhasznaloID` int(11) NOT NULL,
  `markaID` int(11) DEFAULT NULL,
  `jovahagyva` tinyint(1) NOT NULL DEFAULT 0,
  `slug` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `bejegyzes`
--

INSERT INTO `bejegyzes` (`bejegyzesID`, `cim`, `tartalom`, `autoTipus`, `datum`, `felhasznaloID`, `markaID`, `jovahagyva`, `slug`) VALUES
(12, 'Differenciálmű olaj csere', 'Ebben az útmutatóban lépésről lépésre megtanulhatod,\n *hogyan kell házilag differenciálmű olajat cserélni* – ideális például egy **Mitsubishihez** vagy más hátsókerék-meghajtású terepjáróhoz. \n\n\nA megfelelő karbantartás meghosszabbítja az autó élettartamát és csökkenti a kopást.', 'Mitsubishi', '2025-05-07 14:57:15', 3, NULL, 1, 'differencialmu-olaj-csere'),
(13, 'Telsa olajcsere', 'Sokan meglepődnek, amikor megtudják, hogy a **Teslákban** nincs szükség klasszikus motorolajcserére \n\n hiszen elektromos hajtású járművekben **nincs belső égésű motor.**', 'Tesla Model 3', '2025-05-07 15:05:09', 3, NULL, 1, 'telsa-olajcsere'),
(15, 'Első felfüggesztés teljes úrjaépítése', 'A  **Honda Integra** legendás vezethetőségét nagyban köszönheti a precíz első felfüggesztésnek \n\n de idővel még a legjobb rendszer is megkopik.\nHa csattog, nyikorog, vagy instabil az első futómű, lehet, hogy eljött az idő a teljes újraépítésre.', 'Honda Integra', '2025-05-07 15:14:40', 4, NULL, 1, 'elso-felfuggesztes-teljes-urjaepitese'),
(16, 'Fék betét és rotor csere', '### A fékek a biztonság egyik legfontosabb elemei \n\n– ha **nyikorgást**, **remegést** vagy **gyengülő fékhatást** tapasztalsz, ne halogasd a cserét! Pélául a *VW Passat B7* esetében a fékbetét és féktárcsa cseréje otthon is elvégezhető, megfelelő szerszámokkal.', 'Általános', '2025-05-07 15:18:51', 5, NULL, 1, 'fek-betet-es-rotor-csere'),
(17, 'Utastéri légszűrő csere', '### Az utastéri légszűrő (más néven kabinszűrő) \n\ngondoskodik arról, hogy az utastérbe jutó levegő mentes legyen portól, pollentől és egyéb szennyeződésektől. Ha eldugul, csökkenhet a szellőzőrendszer hatékonysága, kellemetlen szag jelenhet meg, vagy párásodhatnak az ablakok.\n\n **15 000 – 20 000 km** vagy évente egyszer, időjárástól és használattól függően.', 'Általános', '2025-05-07 15:22:08', 5, NULL, 1, 'utasteri-legszuro-csere');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `felhasznalo`
--

CREATE TABLE `felhasznalo` (
  `felhasznaloID` int(11) NOT NULL,
  `nev` varchar(30) NOT NULL,
  `jelszo` varchar(100) NOT NULL,
  `felhasznaloNev` varchar(10) NOT NULL,
  `email` varchar(30) NOT NULL,
  `telefonszam` int(11) DEFAULT NULL,
  `jog` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `felhasznalo`
--

INSERT INTO `felhasznalo` (`felhasznaloID`, `nev`, `jelszo`, `felhasznaloNev`, `email`, `telefonszam`, `jog`) VALUES
(1, 'admin', '$2b$10$YfrDUIqwjYigP3QDUG04YOT2RnBM/f1zr/.mKpGSjxuBrnbITzbPe', 'ADMIN', 'admin@admin', NULL, 10),
(3, 'sirokipeter123', '$2b$10$KEZS2FJ30/KNbo3P6Wj3ZOKDcYtnNBFXy8HgL84QOKvCajmh3YgKy', 'sirokipete', 'meb8159@gmail.com', 2147483647, 5),
(4, 'szerelojani123', '$2b$10$z.UMC/JhSjl.O1Mvh3chruSE86B4P712h.nnqLkuaCIWs2AcS6tGu', 'szerelojan', 'szerelojani@szerelojani.com', 2147483647, 5),
(5, 'mattyaskiraly1998', '$2b$10$XzIVxfEi2AUdPzuoeQSC8uA1Eqv39DFa2npmODNH7ebOeo20sjDiW', 'mattyaskir', 'mattyaskiraly1998@gmail.com', 2147483647, 5);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `link`
--

CREATE TABLE `link` (
  `linkID` int(11) NOT NULL,
  `bejegyzesID` int(11) NOT NULL,
  `link` varchar(255) NOT NULL,
  `datum` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `link`
--

INSERT INTO `link` (`linkID`, `bejegyzesID`, `link`, `datum`) VALUES
(15, 12, 'https://www.mobil.com/en/lubricants/for-personal-vehicles/auto-care/vehicle-maintenance/six-steps-to-changing-rear-differential-fuid', '2025-05-07 14:57:15'),
(16, 13, 'https://youtu.be/o5YhUNX-F-M', '2025-05-07 15:05:09'),
(17, 15, 'https://youtu.be/mQ2fJ_aM_T0', '2025-05-07 15:14:40'),
(18, 16, 'https://youtu.be/exDDG9Fxm20', '2025-05-07 15:18:51'),
(19, 17, 'https://www.reddit.com/r/mechanic/comments/1df0zo1/replace_your_cabin_air_filter/', '2025-05-07 15:22:08');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `marka`
--

CREATE TABLE `marka` (
  `markaID` int(11) NOT NULL,
  `marka` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(32) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `bejegyzes`
--
ALTER TABLE `bejegyzes`
  ADD PRIMARY KEY (`bejegyzesID`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `felhasznaloID` (`felhasznaloID`),
  ADD KEY `markaID` (`markaID`);

--
-- A tábla indexei `felhasznalo`
--
ALTER TABLE `felhasznalo`
  ADD PRIMARY KEY (`felhasznaloID`);

--
-- A tábla indexei `link`
--
ALTER TABLE `link`
  ADD PRIMARY KEY (`linkID`),
  ADD KEY `bejegyzesID` (`bejegyzesID`);

--
-- A tábla indexei `marka`
--
ALTER TABLE `marka`
  ADD PRIMARY KEY (`markaID`);

--
-- A tábla indexei `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `bejegyzes`
--
ALTER TABLE `bejegyzes`
  MODIFY `bejegyzesID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT a táblához `felhasznalo`
--
ALTER TABLE `felhasznalo`
  MODIFY `felhasznaloID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `link`
--
ALTER TABLE `link`
  MODIFY `linkID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT a táblához `marka`
--
ALTER TABLE `marka`
  MODIFY `markaID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `bejegyzes`
--
ALTER TABLE `bejegyzes`
  ADD CONSTRAINT `bejegyzes_ibfk_1` FOREIGN KEY (`felhasznaloID`) REFERENCES `felhasznalo` (`felhasznaloID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `bejegyzes_ibfk_2` FOREIGN KEY (`markaID`) REFERENCES `marka` (`markaID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Megkötések a táblához `link`
--
ALTER TABLE `link`
  ADD CONSTRAINT `link_ibfk_1` FOREIGN KEY (`bejegyzesID`) REFERENCES `bejegyzes` (`bejegyzesID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
