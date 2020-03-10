var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "employee_manageDB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

// function which prompts the user for what action they should take
function start() {
    inquirer
        .prompt({
            name: "view",
            type: "list",
            message: "What would you like to do?",
            choices: ["View departments", "View roles", "View employees", "Add departments", "Add roles", "Add employees", "EXIT"]
        })
        .then(function (answer) {
            if (answer.view === "View departments") {
                viewDepart();
            }
            else if (answer.view === "View roles") {
                viewRole();
            }
            else if (answer.view === "View employees") {
                viewEmp();
            }
            else if (answer.view === "Add departments") {
                addDepart();
            }
            else if (answer.view === "Add roles") {
                addRole();
            }
            else if (answer.view === "Add employees") {
                addEmp();
            } else {
                connection.end();
            }
        });
}

function viewDepart() {
    connection.query("SELECT * FROM department;", function (err, data) {
        if (err) throw err;
        console.table(data);
        start();
    });
};

function viewRole() {
    connection.query("SELECT * FROM role;", function (err, data) {
        if (err) throw err;
        console.table(data);
        start();
    });
};

function viewEmp() {
    connection.query("SELECT * FROM employee;", function (err, data) {
        if (err) throw err;
        console.table(data);
        start();
    });
};

function addDepart() {
    // Prompting to add a department
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "What do you want the department ID to be?"
            },
            {
                name: "name",
                type: "input",
                message: "What is the name of the department?"
            }
        ])
        .then(function (answer) {
            // when finished prompting, insert a new department into the db with that info
            connection.query(
                "INSERT INTO department SET ?",
                {
                    id: answer.id,
                    name: answer.name
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your department was created successfully!");
                    // re-prompt the user for if they want to view, add, or update
                    start();
                }
            );
        });
}

function addRole() {
    // Prompting to add a role
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "What do you want the department ID to be?"
            },
            {
                name: "title",
                type: "input",
                message: "What is the title of the role?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary of the role?"
            },
            {
                name: "departmentID",
                type: "input",
                message: "What is the department ID of the role?"
            }
        ])
        .then(function (answer) {
            // when finished prompting, insert a new role into the db with that info
            connection.query(
                "INSERT INTO role SET ?",
                {
                    id: answer.id,
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.departmentID
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your role was created successfully!");
                    // re-prompt the user for if they want to view, add, or update
                    start();
                }
            );
        });
}

function addEmp() {

}
