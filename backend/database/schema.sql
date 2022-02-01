CREATE DATABASE MERAKI_Academy_Project_5;

CREATE TABLE comments(
    id INT AUTO_INCREMENT NOT NULL,
    comment VARCHAR(255),
    post_id INT,
    FOREIGN KEY (post_id) REFERENCES posts(id),
    commenter_id INT,
    FOREIGN KEY (commenter_id) REFERENCES users(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);