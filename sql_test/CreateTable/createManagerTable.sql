CREATE TABLE managers (
    manager_id INT PRIMARY KEY AUTO_INCREMENT,
    manager_name VARCHAR(255) NOT NULL,
    manager_email VARCHAR(255) NOT NULL UNIQUE,
    manager_password VARCHAR(255) NOT NULL,
    managerof INT NOT NULL,
    manager_phonenumber VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (managerof) REFERENCES volunteerOrganizations (org_id)
);