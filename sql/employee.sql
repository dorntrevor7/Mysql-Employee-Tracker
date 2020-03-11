DROP DATABASE IF EXISTS employee_manageDB;
CREATE database employee_manageDB;

USE employee_manageDB;

CREATE TABLE department (
    id INT,
    name VARCHAR(30),
    PRIMARY KEY(id)
);

CREATE TABLE role (
    id INT,
    title VARCHAR(30),
    salary DECIMAL (10,4),
    department_id INT,
    PRIMARY KEY(id)
);

CREATE TABLE employee (
    id INT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY(id)
);
