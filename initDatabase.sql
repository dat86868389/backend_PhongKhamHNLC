CREATE DATABASE ClinicHNLC;
USE ClinicHNLC;

-- ClinicHNLC.Category definition
CREATE TABLE `Category` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `IsDeleted` bit(1) NOT NULL DEFAULT b'0',
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `CreatedBy` int NOT NULL,
  `UpdatedBy` int DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ClinicHNLC.Contact definition
CREATE TABLE `Contact` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Email` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `PhoneNumber` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Subject` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `IsDeleted` bit(1) NOT NULL DEFAULT b'0',
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ClinicHNLC.Department definition
CREATE TABLE `Department` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `IsDeleted` bit(1) NOT NULL DEFAULT b'0',
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `CreatedBy` int NOT NULL,
  `UpdatedBy` int DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ClinicHNLC.Doctor definition
CREATE TABLE `Doctor` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ImagePath` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Position` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `IsDeleted` bit(1) NOT NULL DEFAULT b'0',
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `CreatedBy` int NOT NULL,
  `UpdatedBy` int DEFAULT NULL,
  `StartWorkDate` date DEFAULT NULL,
  `EndWorkDate` date DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ClinicHNLC.`Role` definition
CREATE TABLE `Role` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Description` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ClinicHNLC.Service definition
CREATE TABLE `Service` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `IsDeleted` bit(1) NOT NULL DEFAULT b'0',
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `CreatedBy` int NOT NULL,
  `UpdatedBy` int DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ClinicHNLC.SliderImage definition
CREATE TABLE `SliderImage` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `ImagePath` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Order` int DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ClinicHNLC.Post definition
CREATE TABLE `Post` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Title` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `Content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `ImagePath` text COLLATE utf8mb4_unicode_ci,
  `CategoryId` int NOT NULL,
  `IsDeleted` bit(1) NOT NULL DEFAULT b'0',
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `CreatedBy` int NOT NULL,
  `UpdatedBy` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `fk_post_category` (`CategoryId`),
  CONSTRAINT `fk_post_category` FOREIGN KEY (`CategoryId`) REFERENCES `Category` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ClinicHNLC.Schedule definition
CREATE TABLE `Schedule` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `DoctorId` int NOT NULL,
  `FullName` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `PhoneNumber` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Email` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `MeetDate` date NOT NULL,
  `MeetTime` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `IsDeleted` bit(1) NOT NULL DEFAULT b'0',
  `Note` text COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `fk_schedule_doctor` (`DoctorId`),
  CONSTRAINT `fk_schedule_doctor` FOREIGN KEY (`DoctorId`) REFERENCES `Doctor` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ClinicHNLC.`User` definition
CREATE TABLE `User` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `RoleId` int NOT NULL,
  `Name` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Account` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `HashPassword` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `Status` int NOT NULL,
  `IsDeleted` bit(1) NOT NULL DEFAULT b'0',
  `CreatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`Id`),
  KEY `fk_role` (`RoleId`),
  CONSTRAINT `fk_role` FOREIGN KEY (`RoleId`) REFERENCES `Role` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Thêm bản ghi Role mặc định 
insert into `Role`(Name, Description)
select 'Admin', 'Vai trò quản trị viên'
where not exists (
	select 1 
	from `Role`
	where Name = 'Admin'
);

-- Thêm bản ghi User admin với tài khoản admin, mật khẩu 123
insert into `User`(RoleId, Name, Account, HashPassword, Status, IsDeleted)
select 1, 'Quản trị viên', 'admin', '202cb962ac59075b964b07152d234b70', 1, 0
where not exists (
	select 1 
	from `User`
	where Account = 'admin'
);