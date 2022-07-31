-- @BLOCK
USE professcore;

-- @BLOCK
DROP TABLE professors;
-- @BLOCK
CREATE TABLE professors (
    professor_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL
);

-- @BLOCK
DROP TABLE transfercamp;
-- @BLOCK
CREATE TABLE transfercamp (
    tc_id INT PRIMARY KEY AUTO_INCREMENT,
    subject_id INT FOREIGN KEY,
    professor_id INT FOREIGN KEY,
    class_number CHAR(5) NOT NULL,
    quarter VARCHAR(6) NOT NULL,
    year INT NOT NULL UNSIGNED,
    a_grades INT NOT NULL UNSIGNED,
    b_grades INT NOT NULL UNSIGNED,
    c_grades INT NOT NULL UNSIGNED,
    d_grades INT NOT NULL UNSIGNED,
    f_grades INT NOT NULL UNSIGNED,
    withdrawals INT NOT NULL UNSIGNED
);

-- @BLOCK
DROP TABLE subjects;
-- @BLOCK
CREATE TABLE subjects (
    subject_id INT PRIMARY KEY AUTO_INCREMENT,
    abbrivation VARCHAR(4) NOT NULL UNIQUE,
    full_name VARCHAR(255) NOT NULL UNIQUE
);

-- @BLOCK
DROP TABLE courses;
-- @BLOCK
CREATE TABLE courses (
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    subject_id INT FOREIGN KEY,
    professor_id INT FOREIGN KEY,
    class_number CHAR(5) NOT NULL,
    course_status TINYINT UNSIGNED
);

-- @BLOCK
DROP TABLE ratemyprofessor;
-- @BLOCK
CREATE TABLE ratemyprofessor (
    rmp_id INT PRIMARY KEY AUTO_INCREMENT,
    professor_id INT FOREIGN KEY,
    overall_quality FLOAT UNSIGNED NOT NULL,
    take_again FLOAT UNSIGNED NOT NULL,
    difficulty_level FLOAT UNSIGNED NOT NULL
);