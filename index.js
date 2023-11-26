// Include packages needed for this application
var inquirer = require('inquirer');
const Data = require('./lib/data');
const mysql = require('mysql2');

const data = new Data();

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
            choices: data.getDepartmentNames(),
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
            choices: data.getRoleNames(),
            when: (answers) => answers['option'] === 'Add an employee',
          },
          {
            type: 'list',
            name: 'employee-role',
            message: "Who is the employee's manager?",
            choices: data.getEmployeeNames(),
            when: (answers) => answers['option'] === 'Add an employee',
          },
          {
            type: 'list',
            name: 'employee-role',
            message: "Which employee needs to have their role updated?",
            choices: data.getEmployeeNames(),
            when: (answers) => answers['option'] === "Update an employee's role",
          },
          {
            type: 'list',
            name: 'employee-role',
            message: "What is the employee's new role?",
            choices: data.getRoleNames(),
            when: (answers) => answers['option'] === "Update an employee's role",
          },
    ];


// TODO: Create a function to creat SVG logo
function createLogo(fileName, data) {
    const filePath = path.join(fileName)
    fs.writeFile(filePath, generateLogo(data), (err) =>
    err ? console.log(err) : console.log(`Logo generated! @:${filePath}`)
    );
}

// Create a function to initialize app
function init() {
  // create the connection to database
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Maverick1',
    database: 'data'
  });

  inquirer.prompt(questions).then((answers) => {
      
  })
  .catch((error) => {
      if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      } else {
      // Something else went wrong
      }
  });

  
  connection.end((error) => {
    if (error) {
      console.error('Error closing MySQL connection:', error);
      return;
    }

    console.log('MySQL connection closed.');
  });
}

// Function call to initialize app
init();

