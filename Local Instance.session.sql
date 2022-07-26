
-- @BLOCK
USE professcore;

-- @BLOCK
CREATE TABLE professors (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL
)

-- @BLOCK
INSERT INTO professors (first_name, last_name) 
    VALUES ("test", "test2");

-- @BLOCK
SELECT * FROM professors;


