DROP DATABASE IF EXISTS employee_manageDB;
CREATE database employee_manageDB;

USE employee_manageDB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY(id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL (10,4),
    department_id INT,
    PRIMARY KEY(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY(id),
);

INSERT INTO department (id, first_name)
VALUES (1, "Trevor Dorn");