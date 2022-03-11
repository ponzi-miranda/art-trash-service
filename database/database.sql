CREATE DATABASE arttrash;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email TEXT
);

INSERT INTO users (name, email) VALUES
('ponsi', 'ponzimiranda@gmail.com'),
('mateo', 'edwinmamani@peruvianflauteband.pe');