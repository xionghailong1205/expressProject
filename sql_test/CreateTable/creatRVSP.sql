CREATE TABLE rvsp (
    rvsp_id INT PRIMARY KEY AUTO_INCREMENT,
    rvsp_createat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    rvsp_maker VARCHAR(255) NOT NULL,
    rvsp_of VARCHAR(255) NOT NULL,
    FOREIGN KEY (rvsp_maker) REFERENCES users (user_email),
    FOREIGN KEY (rvsp_of) REFERENCES events (event_title)
);