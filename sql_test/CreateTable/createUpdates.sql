CREATE TABLE updates (
    update_id INT PRIMARY KEY AUTO_INCREMENT,
    update_content VARCHAR(255) NOT NULL,
    update_accessibility VARCHAR(255) NOT NULL,
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    createby VARCHAR(255) NOT NULL,
    FOREIGN KEY (createby) REFERENCES managers (manager_email)
);