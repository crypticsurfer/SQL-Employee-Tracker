// Include packages needed for this application
var inquirer = require('inquirer');
const Data = require('./lib/data');
const mysql = require('mysql2/promise');

const data = new Data();

// Create a function to initialize app
async function init() {

  // create the connection to database
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Maverick1',
    database: 'data'
  });

  // Create an array of questions for user input
  const questions = [
    {
      type: 'list',
      name: 'option',
      message: "What would you like to do?",
      choices: ["View all departments", "View all roles", "View all employees", "Add a department", 
    "Add a role", "Add an employee", "Update an employee's role"]
    },
    {
      type: 'text',
      name: 'department-name',
      message: "What is the department's name?",
      when: (answers) => answers['option'] === 'Add a department',
    },
    {
      type: 'text',
      name: 'role-title',
      message: "What is the role's title?",
      when: (answers) => answers['option'] === 'Add a role',
    },
    {
      type: 'text',
      name: 'role-salary',
      message: "What is the role's salary?",
      when: (answers) => answers['option'] === 'Add a role',
    },
    {
      type: 'list',
      name: 'role-department',
      message: "What department is the role in?",
      choices: await data.getDepartmentChoices(connection),
      when: (answers) => answers['option'] === 'Add a role',
    },
    {
      type: 'text',
      name: 'employee-first-name',
      message: "What is the employee's first name?",
      when: (answers) => answers['option'] === 'Add an employee',
    },
    {
      type: 'text',
      name: 'employee-last-name',
      message: "What is the employee's last name?",
      when: (answers) => answers['option'] === 'Add an employee',
    },
    {
      type: 'list',
      name: 'employee-role',
      message: "What is the employee's role?",
      choices: await data.getRoleChoices(connection),
      when: (answers) => answers['option'] === 'Add an employee',
    },
    {
      type: 'list',
      name: 'employee-manager',
      message: "Who is the employee's manager?",
      choices: await data.getEmployeeChoices(connection),
      when: (answers) => answers['option'] === 'Add an employee',
    },
    {
      type: 'list',
      name: 'employee-to-update',
      message: "Which employee needs to have their role updated?",
      choices: await data.getEmployeeChoices(connection),
      when: (answers) => answers['option'] === "Update an employee's role",
    },
    {
      type: 'list',
      name: 'employee-new-role',
      message: "What is the employee's new role?",
      choices: await data.getRoleChoices(connection),
      when: (answers) => answers['option'] === "Update an employee's role",
    },
  ];

  inquirer.prompt(questions).then(async (answers) => { 
    switch (answers['option']) {
        case "View all departments":
          rows = await data.getTableObject(connection, "department");
          console.log("Departments:");
          console.log("id \t name");
          rows.forEach((row) => console.log(row['id'] + " \t " + row['name']));
          break;
  
        case "View all roles":
          rows = await data.getTableObject(connection, "role");
          console.log("Roles:");
          console.log("id \t title \t salary \t department_id");
          rows.forEach((row) => console.log(row['id'] + " \t " + row['title'] + " \t " + row['salary'] + " \t " + row['department_id']));
          break;
  
        case "View all employees":
          rows = await data.getTableObject(connection, "employee");
          console.log("Employees:");
          console.log("id \t first_name \t last_name \t role_id \t manager_id");
          rows.forEach((row) => console.log(row['id'] + " \t " + row['first_name'] + " \t " + row['last_name'] + " \t " + row['role_id'] + " \t " + row['manager_id']));
          break;
  
        case "Add a department":
          await data.addDepartment(connection, answers['department-name']);
          break;
        
        default:
          console.log('No option selected.')
      }

    // Close the MySQL connection
    connection.end((error) => {
      if (error) {
        console.error('Error closing MySQL connection:', error);
        return;
      }
    });
  });
}


// Function call to initialize app
init();

