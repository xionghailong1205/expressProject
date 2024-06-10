CREATE TABLE admins (
    admin_id INT PRIMARY KEY AUTO_INCREMENT,
    admin_email VARCHAR(255) NOT NULL UNIQUE,
    admin_name VARCHAR(255) NOT NULL,
    admin_number VARCHAR(255) DEFAULT NULL,
    admin_password VARCHAR(255) NOT NULL
);