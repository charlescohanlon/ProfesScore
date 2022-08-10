
-- @BLOCK
DROP DATABASE IF EXISTS professcore;
CREATE DATABASE professcore;

USE professcore;

CREATE TABLE `professors` (
    `professor_id` INT AUTO_INCREMENT,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    UNIQUE(`first_name`, `last_name`),
    PRIMARY KEY (`professor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `subjects` (
    `subject_id` INT AUTO_INCREMENT,
    `abbreviation` VARCHAR(4) NOT NULL UNIQUE,
    `full_name` VARCHAR(255) DEFAULT NULL UNIQUE,
    PRIMARY KEY (`subject_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `courses` (
    `course_id` INT AUTO_INCREMENT,
    `subject_id` INT NOT NULL,
    `class_number` VARCHAR(5) NOT NULL UNIQUE,
    PRIMARY KEY (`course_id`),
    CONSTRAINT FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`subject_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `grade_distributions` (
    `grade_distribution_id` INT AUTO_INCREMENT,
    `professor_id` INT NOT NULL,
    `course_id` INT NOT NULL,
    `year` INT UNSIGNED NOT NULL,
    `quarter` VARCHAR(6) NOT NULL,
    `a_grades` INT UNSIGNED NOT NULL,
    `b_grades` INT UNSIGNED NOT NULL,
    `c_grades` INT UNSIGNED NOT NULL,
    `d_grades` INT UNSIGNED NOT NULL,
    `f_grades` INT UNSIGNED NOT NULL ,
    `withdrawals` INT UNSIGNED NOT NULL,
    PRIMARY KEY (`grade_distribution_id`),
    CONSTRAINT FOREIGN KEY (`professor_id`) REFERENCES `professors` (`professor_id`) ON UPDATE CASCADE,
    CONSTRAINT FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- @BLOCK
CREATE TABLE `sections` (
    `section_id` INT AUTO_INCREMENT,
    `course_id` INT NOT NULL,
    `professor_id` INT NOT NULL,
    `section` VARCHAR(3) NOT NULL,
    `status` TINYINT,
    PRIMARY KEY (`section_id`),
    CONSTRAINT FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`) ON UPDATE CASCADE,
    CONSTRAINT FOREIGN KEY (`professor_id`) REFERENCES `professors` (`professor_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
