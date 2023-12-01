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

    console.log(`
    EEEEEEEEEEEEEEEEEEEEEE                                            lllllll                                                                              
    E::::::::::::::::::::E                                            l:::::l                                                                              
    E::::::::::::::::::::E                                            l:::::l                                                                              
    EE::::::EEEEEEEEE::::E                                            l:::::l                                                                              
      E:::::E       EEEEEE   mmmmmmm    mmmmmmm   ppppp   ppppppppp    l::::l    ooooooooooo yyyyyyy           yyyyyyy eeeeeeeeeeee        eeeeeeeeeeee    
      E:::::E              mm:::::::m  m:::::::mm p::::ppp:::::::::p   l::::l  oo:::::::::::ooy:::::y         y:::::yee::::::::::::ee    ee::::::::::::ee  
      E::::::EEEEEEEEEE   m::::::::::mm::::::::::mp:::::::::::::::::p  l::::l o:::::::::::::::oy:::::y       y:::::ye::::::eeeee:::::ee e::::::eeeee:::::ee
      E:::::::::::::::E   m::::::::::::::::::::::mpp::::::ppppp::::::p l::::l o:::::ooooo:::::o y:::::y     y:::::ye::::::e     e:::::ee::::::e     e:::::e
      E:::::::::::::::E   m:::::mmm::::::mmm:::::m p:::::p     p:::::p l::::l o::::o     o::::o  y:::::y   y:::::y e:::::::eeeee::::::ee:::::::eeeee::::::e
      E::::::EEEEEEEEEE   m::::m   m::::m   m::::m p:::::p     p:::::p l::::l o::::o     o::::o   y:::::y y:::::y  e:::::::::::::::::e e:::::::::::::::::e 
      E:::::E             m::::m   m::::m   m::::m p:::::p     p:::::p l::::l o::::o     o::::o    y:::::y:::::y   e::::::eeeeeeeeeee  e::::::eeeeeeeeeee  
      E:::::E       EEEEEEm::::m   m::::m   m::::m p:::::p    p::::::p l::::l o::::o     o::::o     y:::::::::y    e:::::::e           e:::::::e           
    EE::::::EEEEEEEE:::::Em::::m   m::::m   m::::m p:::::ppppp:::::::pl::::::lo:::::ooooo:::::o      y:::::::y     e::::::::e          e::::::::e          
    E::::::::::::::::::::Em::::m   m::::m   m::::m p::::::::::::::::p l::::::lo:::::::::::::::o       y:::::y       e::::::::eeeeeeee   e::::::::eeeeeeee  
    E::::::::::::::::::::Em::::m   m::::m   m::::m p::::::::::::::pp  l::::::l oo:::::::::::oo       y:::::y         ee:::::::::::::e    ee:::::::::::::e  
    EEEEEEEEEEEEEEEEEEEEEEmmmmmm   mmmmmm   mmmmmm p::::::pppppppp    llllllll   ooooooooooo        y:::::y            eeeeeeeeeeeeee      eeeeeeeeeeeeee  
                                                   p:::::p                                         y:::::y                                                 
                                                   p:::::p                                        y:::::y                                                  
                                                  p:::::::p                                      y:::::y                                                   
                                                  p:::::::p                                     y:::::y                                                    
                                                  p:::::::p                      bbbbbbbb      yyyyyyy                                                     
    DDDDDDDDDDDDD                                 ttttppppp                      b::::::b                                                                  
    D::::::::::::DDD                           ttt:::t                           b::::::b                                                                  
    D:::::::::::::::DD                         t:::::t                           b::::::b                                                                  
    DDD:::::DDDDD:::::D                        t:::::t                            b:::::b                                                                  
      D:::::D    D:::::D  aaaaaaaaaaaaa  ttttttt:::::ttttttt      aaaaaaaaaaaaa   b:::::bbbbbbbbb      aaaaaaaaaaaaa      ssssssssss       eeeeeeeeeeee    
      D:::::D     D:::::D a::::::::::::a t:::::::::::::::::t      a::::::::::::a  b::::::::::::::bb    a::::::::::::a   ss::::::::::s    ee::::::::::::ee  
      D:::::D     D:::::D aaaaaaaaa:::::at:::::::::::::::::t      aaaaaaaaa:::::a b::::::::::::::::b   aaaaaaaaa:::::ass:::::::::::::s  e::::::eeeee:::::ee
      D:::::D     D:::::D          a::::atttttt:::::::tttttt               a::::a b:::::bbbbb:::::::b           a::::as::::::ssss:::::se::::::e     e:::::e
      D:::::D     D:::::D   aaaaaaa:::::a      t:::::t              aaaaaaa:::::a b:::::b    b::::::b    aaaaaaa:::::a s:::::s  ssssss e:::::::eeeee::::::e
      D:::::D     D:::::D aa::::::::::::a      t:::::t            aa::::::::::::a b:::::b     b:::::b  aa::::::::::::a   s::::::s      e:::::::::::::::::e 
      D:::::D     D:::::Da::::aaaa::::::a      t:::::t           a::::aaaa::::::a b:::::b     b:::::b a::::aaaa::::::a      s::::::s   e::::::eeeeeeeeeee  
      D:::::D    D:::::Da::::a    a:::::a      t:::::t    tttttta::::a    a:::::a b:::::b     b:::::ba::::a    a:::::assssss   s:::::s e:::::::e           
    DDD:::::DDDDD:::::D a::::a    a:::::a      t::::::tttt:::::ta::::a    a:::::a b:::::bbbbbb::::::ba::::a    a:::::as:::::ssss::::::se::::::::e          
    D:::::::::::::::DD  a:::::aaaa::::::a      tt::::::::::::::ta:::::aaaa::::::a b::::::::::::::::b a:::::aaaa::::::as::::::::::::::s  e::::::::eeeeeeee  
    D::::::::::::DDD     a::::::::::aa:::a       tt:::::::::::tt a::::::::::aa:::ab:::::::::::::::b   a::::::::::aa:::as:::::::::::ss    ee:::::::::::::e  
    DDDDDDDDDDDDD         aaaaaaaaaa  aaaa         ttttttttttt    aaaaaaaaaa  aaaabbbbbbbbbbbbbbbb     aaaaaaaaaa  aaaa sssssssssss        eeeeeeeeeeeeee`)


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
            choices: await data.getEmployeeChoices(connection, true),
            when: (answers) => answers['option'] === 'Add an employee',
        },
        {
            type: 'list',
            name: 'employee-to-update',
            message: "Which employee needs to have their role updated?",
            choices: await data.getEmployeeChoices(connection, false),
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

            case "Add a role":
                await data.addRole(connection, answers['role-title'], answers['role-salary'], answers['role-department']);
                break;

            case "Add an employee":
                await data.addEmployee(connection, answers['employee-first-name'], answers['employee-last-name'], answers['employee-role'], answers['employee-manager']);
                break;

            case "Update an employee's role":
                await data.updateEmployee(connection, answers['employee-to-update'], answers['employee-new-role']);
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

