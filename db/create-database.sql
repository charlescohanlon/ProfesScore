
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
    `department` VARCHAR(255) DEFAULT NULL, -- SHOULD PROBABLY CHANGE default null here
    PRIMARY KEY (`subject_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `courses` (
    `course_id` INT AUTO_INCREMENT,
    `subject_id` INT NOT NULL,
    `class_number` VARCHAR(5) NOT NULL,
    UNIQUE(`subject_id`, `class_number`),
    PRIMARY KEY (`course_id`),
    CONSTRAINT FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`subject_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `professor_courses` (
	`professor_id` INT NOT NULL,
	`course_id` INT NOT NULL,
    PRIMARY KEY (`professor_id`, `course_id`),
    CONSTRAINT FOREIGN KEY (`professor_id`) REFERENCES `professors` (`professor_id`) ON UPDATE CASCADE,
    CONSTRAINT FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`) ON UPDATE CASCADE
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
    UNIQUE(`professor_id`, `course_id`, `year`, `quarter`, `a_grades`, `b_grades`, `c_grades`, `d_grades`, `f_grades`, `withdrawals`),
    PRIMARY KEY (`grade_distribution_id`),
    CONSTRAINT FOREIGN KEY (`professor_id`) REFERENCES `professors` (`professor_id`) ON UPDATE CASCADE,
    CONSTRAINT FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `quality_ratings` (
    `quality_rating_id` INT AUTO_INCREMENT,
    `professor_id` INT NOT NULL,
	`rating` DECIMAL(2,1),
    `difficulty` DECIMAL(2,1),
    `retake_rate` INT NOT NULL,
    `num_ratings` INT NOT NULL,
	UNIQUE(`professor_id`, `rating`, `difficulty`, `retake_rate`, `num_ratings`),
    PRIMARY KEY (`quality_rating_id`),
    CONSTRAINT FOREIGN KEY (`professor_id`) REFERENCES `professors` (`professor_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `score_contexts` (
	`score_context_id` INT AUTO_INCREMENT,
    `course_id` INT DEFAULT NULL,
    PRIMARY KEY (`score_context_id`),
    CONSTRAINT FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `scores` (
	`professor_id` INT NOT NULL,
	`score_context_id` INT NOT NULL,
    `score` INT NOT NULL,
    PRIMARY KEY (`professor_id`, `score_context_id`),
    CONSTRAINT FOREIGN KEY (`professor_id`) REFERENCES `professors` (`professor_id`) ON UPDATE CASCADE,
    CONSTRAINT FOREIGN KEY (`score_context_id`) REFERENCES `score_contexts` (`score_context_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- @BLOCK
-- CREATE TABLE `sections` (
--     `section_id` INT AUTO_INCREMENT,
--     `course_id` INT NOT NULL,
--     `professor_id` INT NOT NULL,
--     `section` VARCHAR(3) NOT NULL,
--     `status` TINYINT,
--     PRIMARY KEY (`section_id`),
--     CONSTRAINT FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`) ON UPDATE CASCADE,
--     CONSTRAINT FOREIGN KEY (`professor_id`) REFERENCES `professors` (`professor_id`) ON UPDATE CASCADE
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
