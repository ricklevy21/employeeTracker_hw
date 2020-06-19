//--------------------------------------------------------------------------------
//DEPENDENCIES
//--------------------------------------------------------------------------------
var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");
var util = require("util");
//--------------------------------------------------------------------------------
//DATABASE CONNECTION
//--------------------------------------------------------------------------------
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "hunter21",
    database: "office"
});

connection.connect(function(err){
    if (err) throw err;
    console.log("The connection to the database was made sucessfully");
    //function to start CLI application
    employeeTracker();

});
//--------------------------------------------------------------------------------
//GLOBAL VARAIBLES
const departments = ["admin","sales","accounting","customer relations","human resources","corporate"];
const roles = ["Regional Manager", "Receptonist","Assistant to the Regional Manager","Sales Associate","Customer Service Reprensentative","Quality Assurance","Accountant","HR Representative","Vice President"]
const employees = ["Michael","Pam","Dwight","Jim","Jan"]
//--------------------------------------------------------------------------------


//--------------------------------------------------------------------------------
//FUNCTIONS
//--------------------------------------------------------------------------------
//function to start the CLI applicaiton
var employeeTracker = function(){
    inquirer
        .prompt({
            name: "start",
            type: "list",
            message: "Greetings. What would you like to do? Press CTRL+C to Exit Application Anytime",
            choices: [
                "Add records to database",
                "View records in database",
                "Update records in database",
                "Delete records in database",
                "EXIT"
            ]
        })
        .then(function(answer){
            switch(answer.start){
                case "Add records to database":
                    addRecords();
                    break;

                case "View records in database":
                    viewRecords();
                    break;

                case "Update records in database":
                    updateRecords();
                    break;

                case "Delete records in database":
                    deleteRecords();
                    break;

                case "EXIT":
                    connection.end();
                    console.log("Thank you, goodbye.")
            }
        })
};

//function to add records
var addRecords = function(){
    //console.log("add records")
    inquirer    .prompt({
        name: "add",
        type: "list",
        message: "What would you like to add?",
        choices: [
            "Department",
            "Role",
            "Employee"
        ]
    })
    .then(function(answer){
        switch(answer.add){
            case "Department":
                addDepartment();
                break;
                
            case "Role":
               addRole();
                break;
            
            case "Employee":
                addEmployee();
                break;
                    
                    
        }
    })
};

//function to view records
var viewRecords = function(){
    //console.log("viewRecords")
    inquirer    .prompt({
        name: "view",
        type: "list",
        message: "What would you like to view?",
        choices: [
            "All Departments",
            "All Roles",
            "All Employees",
            "Department Budgets"
        ]
    })
    .then(function(answer){
        switch(answer.add){
            case "All Departments":
                viewDepartments();
                break;

            case "All Roles":
                viewRoles();
                break;

            case "All Employees":
                viewEmployees();
                break;

            case "Department Budgets":
                viewBudgets();
                break;
        }
    })
};


//function to update records
var updateRecords = function(){
    //console.log("update records")
    inquirer    .prompt({
        name: "update",
        type: "list",
        message: "What would you like to update?",
        choices: [
            "Employee Role",
            "Employee Manager"
        ]
    })
    .then(function(answer){
        switch(answer.add){
            case "Employee Role":
                //exectute query
                break;

            case "Employee Manager":
                //exectute query
                break;
        }
    })
};

//function to delete records
var deleteRecords = function(){
    //console.log("update records")
    inquirer    .prompt({
        name: "update",
        type: "list",
        message: "What would you like to delete?",
        choices: [
            "Department",
            "Role",
            "Employee"
        ]
    })
    .then(function(answer){
        switch(answer.add){
            case "Department":
                //exectute query
                break;

            case "Role":
                //exectute query
                break;

            case "Employee":
                //exectute query
                break;
        }
    })
};

//function for user to add department
var addDepartment = function(){
    inquirer
        .prompt({
            name: "addDept",
            type: "input",
            message: "Enter the name of the new department you would like to add to the database:"
        })
        .then(function(answer){
            var query = "INSERT INTO department (name) VALUES (?)";
            var params = [answer.addDept];
            connection.query(query, params, function(err, res){
                if (err) throw err;
                console.log(`A new department called ${answer.addDept} has been added to the database`);
                employeeTracker();
            })
        })
};



//function to create departments array from db--------------------------NOT WORKING
var getDepts = function(){
    var deptQuery = "SELECT name FROM department";
    connection.query(deptQuery, function(err, res){
        if (err) throw err;
        for (var i = 0; i < res.length; i++){
            departments.push(res[i].name)
        }
    })
    connection.end()
}

//function for user to add role
function addRole(){
    inquirer
        .prompt([
            {
                name: "addRoleTitle",
                type: "input",
                message: "Enter the title of the new role you would like to add to the database:"
            },
            {
                name: "addRoleSalary",
                type: "input",
                message: "Enter the salary for the new role:"
            },
            {
                name: "addRoleDept",
                type: "list",
                message: "Select the department for which this role belongs",
                choices: departments
            }]
        )
        .then(function(answer){
            var query = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, (SELECT id FROM department WHERE name = ?))";
            var params = [answer.addRoleTitle, answer.addRoleSalary, answer.addRoleDept];
            connection.query(query, params, function(err, res){
                if (err) throw err;
                console.log(`A new role with the title ${answer.addRoleTitle} has been added to the ${answer.addRoleDept} department with a salary of ${answer.addRoleSalary}`);
                employeeTracker();
            })
        })

};

//function to add employee
function addEmployee(){
    inquirer
        .prompt([
            {
                name: "addEmpFirstName",
                type: "input",
                message: "Enter the first name of the new employee:"
            },
            {
                name: "addEmpLastName",
                type: "input",
                message: "Enter the last name of the new employee:"
            },
            {
                name: "addEmpRole",
                type: "list",
                message: "Select the role for which this employee was hired",
                choices: roles
            },
            {
                name: "addEmpManager",
                type: "list",
                message: "Who will be the employee's manager?",
                choices: employees
            }
    ]
        )
        .then(function(answer){
            var query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, (SELECT id FROM role WHERE title = ?), (SELECT id FROM employee AS e WHERE e.first_name = ?))";
            var params = [answer.addEmpFirstName, answer.addEmpLastName, answer.addEmpRole, answer.addEmpManager];
            connection.query(query, params, function(err, res){
                if (err) throw err;
                console.log(`A new employee named ${answer.addEmpFirstName} ${answer.addEmpLastName} with the role ${answer.addEmpRole} has been added to the database. ${answer.addEmpManager} will be their manager`);
                employeeTracker();
            })
        })

};


//function to view all departments
var viewDepartments = function() {
    var query = "SELECT * FROM department";
    connection.query(query, function(err, res){
        if (err) throw err;
    })
    console.log(res);
    employeeTracker()
}

//function to view all roles
var viewRoles = function(){
    var query = "SELECT * FROM role";
    connection.query(query, function(err, res){
        if (err) throw err;
    })
    console.table(res);
    employeeTracker()
}
//function to view all employees
var viewEmployees = function(){
    var query = "SELECT * FROM employee";
    connection.query(query, function(err, res){
        if (err) throw err;
    })
    console.table(res);
    employeeTracker()
}
//function to view a department's budget
var viewBudgets = function(){

};