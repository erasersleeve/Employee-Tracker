const inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "anorak3/pigeon",
    database: "tracker_db"
  });

  connection.connect(function(err) {
    if (err) throw err;
    console.log("Welcome to the employee tracker!");
    console.log("--------------------------------")
    init();
  });

  function init() {
    inquirer
        .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
        "View All Employees",
        "View All Employees by Department",
        "View All Employees by Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "View All Roles",
        "exit"
      ]
    })
    .then(function(res){
      switch (res.action)  {
        case "View All Employees":
        viewEmployees();
        break;

        case "View All Employees by Department":
        
        break;

        case "View All Employees by Manager":
        
        break;

        case  "Add Employee":
        addEmployee();       
        break;

        case "Remove Employee":
        removeEmployee();
        break;

        case "Update Employee Role":

        break;

        case "Update Employee Manager":

        break;

        case "View All Roles":

        break;

        case "exit":

        break;
      }
    });
  };

function viewEmployees() {
  var query = "SELECT * FROM employee";
  connection.query(query, function(err, res) {
    if (err) throw err;
    // console.log(res);
    for (var i = 0; i < res.length; i++) {
      console.log("ID: " + res[i].employee_id + " || First Name: " + res[i].first_name + " || Last Name: " + res[i].last_name);
    }
  });
  init();
};

function addEmployee() {
  let managerArr = ["This employee has no manager"];
  let query = "SELECT first_name, last_name FROM employee";
  connection.query(query, function(err, res){
    if (err) throw err;
    // console.log(res);
    // console.log("\n");
    for (var i = 0; i < res.length; i++) {
      // console.log(res[i].first_name, res[i].last_name);
      let managerSelect = res[i].first_name + " " + res[i].last_name;
      // console.log(managerSelect);
      managerArr.push(managerSelect);
    }
    // console.log(managerArr);
  });
  inquirer
    .prompt([
      {
      name: "firstName",
      type: "input",
      message: "What is the employee's first name?"
    },
    {
      name: "lastName",
      type: "input",
      message: "What is the employee's last name?"
    }, 
    {
      name: "title",
      type: "list",
      message: "What is the employee's title?",
      choices: [
        "Sales Lead",
        "Salesperson",
        "Lead Engineer",
        "Software Engineer",
        "Legal Team Lead",
        "Lawyer",
        "Accountant"
      ]
    }
    ,{
      name:"manager",
      type: "list",
      message: "Who is this employee's manager?",
      choices: managerArr
    }
  ])
  .then(function(newData){
    let firstName = newData.firstName;
    let lastName = newData.lastName;
    let roleId = newData.title;
    // console.log(newData.firstName);
    // console.log(newData.lastName);
    // console.log(newData.title);
    // switch (newData.title) {
    //   case "Sales Lead":
    //     connection.query("INSERT INTO employee SET ?",
    //     {
    //       role_id: 1,
    //     }
    //     );
    //     console.log("woo");
    //     break;
    //   case "Salesperson":
    //     break;  
    //   case "Lead Engineer":
    //     break;
    //   case "Software Engineer":
    //     break;
    //   case "Legal Team Lead":
    //     break;
    //   case "Lawyer":
    //     break;
    //   case "Accountant":
    //     break;
    
    // } 

    connection.query("INSERT INTO employee SET ?",
    {
      first_name: firstName,
      last_name: lastName,
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " employee added!\n");
      init();
    }
    );
  })
};

function removeEmployee() {
  console.log("Deleting employee...\n");
  connection.query(
    "DELETE FROM employee WHERE ?",
    {
      //selected entry
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " Employee deleted \n");
      // Call  AFTER the DELETE completes
     
    }
  );
}: