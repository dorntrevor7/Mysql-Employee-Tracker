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
            choices: ["View departments", "View roles", "View employees", "Add department", "Add role", "Add employee", "Update employee", "EXIT"]
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
            else if (answer.view === "Add department") {
                addDepart();
            }
            else if (answer.view === "Add role") {
                addRole();
            }
            else if (answer.view === "Add employee") {
                addEmp();
            }
            else if (answer.view === "Update employee") {
                updateEmployee();
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
    // Prompting to add a role
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "What is the new employees ID?"
            },
            {
                name: "firstname",
                type: "input",
                message: "What is the first name of the employee?"
            },
            {
                name: "lastname",
                type: "input",
                message: "What is the last name of the employee?"
            },
            {
                name: "roleID",
                type: "input",
                message: "What is the the role ID of the employee?"
            },
            {
                name: "managerID",
                type: "input",
                message: "What is the employee manager ID?"
            }
        ])
        .then(function (answer) {
            // when finished prompting, insert a new role into the db with that info
            connection.query(
                "INSERT INTO employee SET ?",
                {
                    id: answer.id,
                    first_name: answer.firstname,
                    last_name: answer.lastname,
                    role_id: answer.roleID,
                    manager_id: answer.managerID
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your role was created successfully!");
                    // re-prompt the user for if they want to view, add, or update
                    start();
                }
            );
        });
};

// function update() {
//     inquirer
//         .prompt([
//             {
//                 name: "update",
//                 type: "list",
//                 message: "What would you like to update?",
//                 choices: ["Departments", "Roles", "Employees", "EXIT"]
//             },
//         ]).then(function (answer) {

//             if (answer.update === "Departments") {
//                 updateDepart();
//             }
//             else if (answer.update === "Roles") {
//                 updateRole();
//             }
//             else if (answer.update === "Employees") {
//                 updateEmp();
//             } else {
//                 connection.end();
//             }
//         });
// };

function updateEmployee() {
    // query the database for 
    connection.query("SELECT * FROM employee", function (err, results) {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to bid on
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].name);
                        }
                        return choiceArray;
                    },
                    message: "What would like to update?"
                },
                {
                    name: "bid",
                    type: "input",
                    message: "What do you want to update it to?"
                }
            ]).then(function (answers) {
                var chosenUpdate;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].name === answers.choice) {
                        chosenUpdate = results[i];
                    }
                }

                connection.query(
                    "UPDATE FROM employee SET ? WHERE ?",
                    [
                        {
                            name: answers.bid
                        },
                        {
                            id: chosenUpdate.id
                        }
                    ],
                    function (error) {
                        if (error) throw err;
                        console.log("Bid placed successfully!");
                    }
                );
                start();
            });
    });
}

function updateRole() {

}

function updateEmp() {

}