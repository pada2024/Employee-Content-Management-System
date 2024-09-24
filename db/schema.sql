DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

\c employee_db;

CREATE TABLE employees (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(25) NOT NULL,
  last_name VARCHAR(25) NOT NULL,
  title VARCHAR(50) NOT NULL,
  department VARCHAR(25) NOT NULL,
  salary INTEGER NOT NULL,
  manager VARCHAR(25) NOT NULL
);

-- --Add Values into employees DB
-- INSERT INTO employees (id, first_name, last_name, title, department, salary, manager
-- );

-- VALUES (11, 'John', 'Doe', 'Sales lead', 'Sales', 100000, 'null');

-- SELECT * FROM employees;

-- CREATE TABLE first_name (
--   id SERIAL PRIMARY KEY,
--   first_name VARCHAR(25) NOT NULL
-- );

-- CREATE TABLE last_name (
--   last_name VARCHAR(25) NOT NULL
-- );

-- CREATE TABLE title (
--   id SERIAL PRIMARY KEY,
--   title VARCHAR(50) NOT NULL
-- );

-- CREATE TABLE department (
--   department VARCHAR(25) NOT NULL
-- );

-- CREATE TABLE salary (
--    salary INTEGER
-- );

-- CREATE TABLE manager (
--   manager VARCHAR(25) NOT NULL
-- );

-- CREATE TABLE reviews (
--     id SERIAL PRIMARY KEY,
--     movie_id INT,
--     review TEXT NOT NULL,
--     FOREIGN KEY (movie_id)
--     REFERENCES movies(id)
--     ON DELETE SET NULL
-- );
