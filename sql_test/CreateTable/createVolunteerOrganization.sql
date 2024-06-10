CREATE TABLE volunteerOrganizations (
    org_id INT PRIMARY KEY AUTO_INCREMENT,
    org_name VARCHAR(255) NOT NULL UNIQUE,
    org_email VARCHAR(255) NOT NULL UNIQUE,
    org_img VARCHAR(255) DEFAULT NULL,
    org_description VARCHAR(255) DEFAULT NULL,
    branchof INT DEFAULT NULL,
    FOREIGN KEY (branchof) REFERENCES volunteerOrganizations (org_id)
);