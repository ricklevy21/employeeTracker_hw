//DEPENDENCIES
var mysql = require("mysql");
var inquirer = require("inquirer");

//DATABASE CONNECTION
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

//FUNCTIONS

var employeeTracker = function(){
    inquirer
        .prompt({
            name: "start",
            type: "list",
            message: "Greetings. What would you like to do?",
            choices: [
                "Add records to database",
                "View records in database",
                "Update records in database",
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

                case "EXIT":
                    connection.end();
                    console.log("Thank you, goodbye.")
            }
        })
};


var addRecords = function(){
    console.log("add records")
};

var viewRecords = function(){
    console.log("viewRecords")
};

var updateRecords = function(){
    console.log("update records")
};







