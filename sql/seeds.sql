
USE employee_manageDB;

-- DEPARTMENTS
INSERT INTO department VALUES (1, "Sales");
INSERT INTO department VALUES (2, "Retail");

-- Department roles
INSERT INTO role VALUES(1, "manager", 120000, 1);
INSERT INTO role VALUES(2, "sales_manager", 100000, 1);
INSERT INTO role VALUES(3, "salesman", 80000, 1);
INSERT INTO role VALUES(4, "retail_lead", 70000, 2);
INSERT INTO role VALUES(5, "retailFloor", 50000, 2);

-- Manager
INSERT INTO employee (id, first_name, last_name, role_id) VALUES(1, "Trevor", "Dorn", 1);
-- Sales manager
INSERT INTO employee  VALUES(2, "Mike", "Plichta", 2, 1);
-- Salesman
INSERT INTO employee  VALUES(3, "Ken", "last", 3, 2);
-- Retial lead
INSERT INTO employee  VALUES(4, "Becky", "last", 4, 1);
-- Retail workers
INSERT INTO employee  VALUES(5, "Tuck", "last", 5, 4);
INSERT INTO employee  VALUES(6, "Dom", "last", 5, 4);
INSERT INTO employee  VALUES(7, "Shelly", "last", 5, 4);