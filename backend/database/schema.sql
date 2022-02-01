DROP DATABASE MERAKI_Academy_Project_5;
CREATE DATABASE MERAKI_Academy_Project_5;

CREATE TABLE users (
    id INT AUTO_INCREMENT NOT NULL,
    userName VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    dob DATETIME ,
    country VARCHAR(255),
    role_id INT,
    profileimage VARCHAR(255),
    gender VARCHAR(255),
    FOREIGN KEY (role_id) REFERENCES roles(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id));
