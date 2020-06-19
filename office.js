//--------------------------------------------------------------------------------
//DEPENDENCIES
//--------------------------------------------------------------------------------
var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

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
                addWhat();
                break;
            
            case "Employee":
                addWhat();
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
            "All Department",
            "All Roles",
            "All Employees",
            "Department Budgets"
        ]
    })
    .then(function(answer){
        switch(answer.add){
            case "All Department":
                //exectute query
                break;

            case "All Roles":
                //exectute query
                break;

            case "All Employees":
                //exectute query
                break;

            case "Department Budgets":
                //exectute query
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







