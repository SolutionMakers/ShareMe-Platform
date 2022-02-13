DROP DATABASE MERAKI_Academy_Project_5;

CREATE DATABASE MERAKI_Academy_Project_5;

USE MERAKI_Academy_Project_5;

CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL,
    role VARCHAR(255) NOT NULL UNIQUE,
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE users (
    id INT AUTO_INCREMENT NOT NULL,
    userName VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    dob DATETIME,
    country VARCHAR(255),
    profileimage VARCHAR(255),
    profilecover VARCHAR(255),
    gender VARCHAR(255),
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE posts (
    id INT AUTO_INCREMENT NOT NULL,
    description VARCHAR(255),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    media VARCHAR(255),    
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE comments(
    id INT AUTO_INCREMENT NOT NULL,
    comment VARCHAR(255),
    commenter_id INT,
    FOREIGN KEY (commenter_id) REFERENCES users(id),
    post_id INT,
    FOREIGN KEY (post_id) REFERENCES posts(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE likes(
    id INT AUTO_INCREMENT NOT NULL,
    post_id INT,
    FOREIGN KEY (post_id) REFERENCES posts(id),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE rooms(
    id INT AUTO_INCREMENT NOT NULL,
    sender_id INT,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    receiver_id INT,
    FOREIGN KEY (receiver_id) REFERENCES users(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE message(
    id INT AUTO_INCREMENT NOT NULL,
    room_id INT,
    FOREIGN KEY (room_id) REFERENCES rooms(id),
    sender_id INT,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    message VARCHAR(500),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE friends(
    id INT AUTO_INCREMENT NOT NULL,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    friend INT,
    FOREIGN KEY (friend) REFERENCES users(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);

