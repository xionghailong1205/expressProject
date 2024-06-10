CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    user_email VARCHAR(255) NOT NULL UNIQUE,
    user_name VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_phonenumber VARCHAR(255) DEFAULT NULL,
    user_address VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    memberof INT DEFAULT NULL,
    FOREIGN KEY (memberof) REFERENCES volunteerOrganizations (org_id)
);