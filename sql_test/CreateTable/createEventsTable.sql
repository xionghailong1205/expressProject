CREATE TABLE events (
    event_id INT PRIMARY KEY AUTO_INCREMENT,
    event_title VARCHAR(255) NOT NULL,
    event_content VARCHAR(255) NOT NULL,
    open_time TIMESTAMP NOT NULL,
    close_time TIMESTAMP NOT NULL,
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    createby VARCHAR(255) NOT NULL,
    FOREIGN KEY (createby) REFERENCES managers (manager_email)
);