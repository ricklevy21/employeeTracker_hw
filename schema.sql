DROP DATABASE IF EXISTS office;
CREATE DATABASE office;
USE office;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(60),
    salary decimal(10,2),
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES role(id)
);

INSERT INTO department (id, name)
VALUES
(1, "admin"),
(2, "sales"),
(3, "accounting"),
(4, "customer relations"),
(5, "human resources"),
(6, "corporate")
;

INSERT INTO role (id, title, salary, department_id)
VALUES
(1, "Regional Manager", 50000.00, 1),
(2, "Receptonist", 30000.00, 1),
(3, "Assistant to the Regional Manager", 40000.00, 2),
(4, "Sales Associate", 40000, 2),
(5, "Customer Service Reprensentative", 35000.00, 4),
(6, "Quality Assurance", 35000.00, 4),
(7, "Accountant", 40000.00, 3),
(8, "HR Representative", 40000.00, 5),
(9, "Vice President", 60000.00, 6)
;

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
(1, "Michael", "Scott", 1, 9),
(2, "Pam", "Beesly", 2, 1),
(3, "Dwight", "Schrute", 3, 1),
(4, "Jim", "Halpert", 4, 1),
(5, "Jan", "Levinson", 9, NULL);
