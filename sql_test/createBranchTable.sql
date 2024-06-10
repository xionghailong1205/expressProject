CREATE TABLE branches (
    branch_id INT PRIMARY KEY AUTO_INCREMENT,
    org_id INT NOT NULL,
    branch_name VARCHAR(255) NOT NULL UNIQUE,
    FOREIGN KEY (org_id) REFERENCES volunteerOrganizations (org_id)
);