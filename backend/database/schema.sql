CREATE DATABASE MERAKI_Academy_Project_5;

CREATE TABLE posts (
    id INT AUTO_INCREMENT NOT NULL,
    description VARCHAR(255),
    user_id INT,
    comment_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (comment_id) REFERENCES comments(id),
    media VARCHAR(255),
    like_id INT,
    FOREIGN KEY (like_id) REFERENCES likes(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);