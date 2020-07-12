INSERT INTO department (name) 
VALUES ("Engineering"),("Sales"),("Legal"),("Finance");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 2),("Sales Person", 80000, 2),("Lead Engineer", 150000, 1),("Software Engineer", 120000, 1), ("Legal Team Lead", 250000, 3), ("Lawyer", 190000, 3),("Accountant", 125000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jerry", "Lawlor", 1, null),("George", "Tanzacos", 2, 1),("Emily", "Dickins", 3, null),("Dorian", "Wilde", 4, 3),("Xavier", "Middlebrooks", 5, null),("Daniel", "Sarkosy", 6, 5),("Dianna", "McGoldrick", 7, null);



SELECT * FROM employee;
SELECT * FROM role;
SELECT * FROM department;

SELECT e.first_name, e.last_name, r.title, d.name
FROM employee e
INNER JOIN role r ON e.role_id = r.id
INNER JOIN department d ON r.department_id = d.id;


SELECT e.first_name, e.last_name, r.title, r.salary, d.name AS department_name, CONCAT(e2.first_name," ", e2.last_name) AS manager_name
FROM employee e
LEFT JOIN employee e2 ON e.manager_id = e2.employee_id
LEFT JOIN role r ON e.role_id = r.id
LEFT JOIN department d ON r.department_id = d.id;
