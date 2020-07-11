DROP DATABASE IF EXISTS tracker_db;
CREATE DATABASE tracker_db;
USE tracker_db; 

CREATE TABLE department (
    id INT AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY(id)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL(10,2),
    department_id int,
    PRIMARY KEY(id),
    FOREIGN KEY (department_id) REFERENCES department(id)

);


CREATE TABLE employee (
    employee_id INT AUTO_INCREMENT NOT NULL,
    first_name  VARCHAR(30),
    last_name VARCHAR(30),
    role_id int,
    manager_id int,
    PRIMARY KEY(employee_id),
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(employee_id)

);

