DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

\c employee_db;

CREATE TABLE first_name (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(25) NOT NULL
);

CREATE TABLE last_name (
  last_name VARCHAR(25) NOT NULL
);

CREATE TABLE title (
  title VARCHAR(50) NOT NULL
);

CREATE TABLE department (
  department VARCHAR(25) NOT NULL
);

CREATE TABLE salary (
   id INTEGER
);

CREATE TABLE manager (
  movie_name VARCHAR(25) NOT NULL
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    movie_id INT,
    review TEXT NOT NULL,
    FOREIGN KEY (movie_id)
    REFERENCES movies(id)
    ON DELETE SET NULL
);
