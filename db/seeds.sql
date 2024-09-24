

INSERT INTO employees (id, first_name, last_name, title, department, salary, manager);
VALUES (1, 'John', 'Doe', 'Sales Lead', 'Sales', 100000, 'null'),
       (2, 'Mike', 'Chan', 'Salesperson', 'Sales', 80000, 'John Doe'),
       (3, 'Ashley', 'Rodriguez', 'Lead Engineer', 'Engineering', 150000, 'null'),
       (4, 'Kevin', 'Tupik', 'Software Engineer', 'Engineering', 120000, 'Ashley Rdriguez'),
       (5, 'Kunal', 'Tupik', 'Acount Manager', 'Finance', 160000, 'null' ),
       (6, 'Malia', 'Brown', 'Accountant', 'Finance', 125000, 'Kunal Singh'),
       (7, 'Sarah', 'Lour', 'Legal Team Lead', 'Legal', 250000, 'null'),
       (8, 'Tom', 'Allen', 'Lawyer', 'Legal', 190000, 'Sarah Lourd');

       
SELECT * FROM employee;           


