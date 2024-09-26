


// Import and require Pool (node-postgres)
const { Pool } = require('pg');
require("dotenv").config();
const inquirer = require('inquirer');

let db;

// Connect to database
async function connectDb() {
  const pool = new Pool(
    {
      // PostgreSQL username
      user: process.env.USER,
      // PostgreSQL password
      password: process.env.PASSWORD,
      host: '127.0.0.1',
      database: 'employee_db',
      port: 5432
    },
    console.log(`Connected to the employees_db database.`)
  )

  db = await pool.connect()
}

async function mainMenu() {

  const actionQuestions = [{
    name: "action",
    type: "list",
    message: "Welcome! What would you like to do?",
    choices: [
      "View all Departments",
      "View all Roles",
      "View all Employees",
      "Add an Employee",
      "Add a Department",
      "Add an Employee's role",
      "Update an Employee's role",
      "Delete an Employee",
      "Exit"
    ]
  }];

  // Inquirer prompt 
  inquirer
    .prompt(actionQuestions)
    .then((answers) => {

      if (answers.action == "View all Departments") {
        const sql = "SELECT * FROM department";

        db.query(sql, (err, result) => {
          if (err) {
            console.log(err)
            return;
          } else {
            console.table(result.rows)
            mainMenu();
          }
        });

      }
      else if (answers.action == "View all Roles") {
        const sql = "SELECT * FROM role";
        db.query(sql, (err, result) => {
          if (err) {
            console.log(err)
            return;
          } else {
            console.table(result.rows)
            mainMenu();
          }
        });


      }
      else if (answers.action == "View all Employees") {
        const sql = "SELECT * FROM employee";
        db.query(sql, (err, result) => {
          if (err) {
            console.log(err)
            return;
          } else {
            console.table(result.rows)
            mainMenu();
          }
        });

      }

      else if (answers.action == "Add an Employee") {
        const sql = "INSERT INTO employee";
        db.query(sql, (err, result) => {
          if (err) {
            console.log(err)
            return;
          } else {
            console.table(result.rows)
            mainMenu();
          }
        });

      }

      else if (answers.action == "Add a Department") {
        const sql = "INSERT INTO department";
        db.query(sql, (err, result) => {
          if (err) {
            console.log(err)
            return;
          } else {
            console.table(result.rows)
            mainMenu();
          }
        });

      }

      else if (answers.action == "Add an Employee's Role") {
        const sql = "INSERT INTO department";
        db.query(sql, (err, result) => {
          if (err) {
            console.log(err)
            return;
          } else {
            console.table(result.rows)
            mainMenu();
          }
        });

      }

      else if (answers.action == "Update an Employee's Role") {
        const sql = "INSERT INTO department";
        db.query(sql, (err, result) => {
          if (err) {
            console.log(err)
            return;
          } else {
            console.table(result.rows)
            mainMenu();
          }
        });

      }

      else if (answers.action == "Delete an Employee") {
        const sql = "DELETE FROM employee WHERE id = $1";
        const params = [req.params.id];
        db.query(sql, (err, result) => {
          if (err) {
            console.log(err)
            return;
          } else {
            console.table(!result.rowCount)
            mainMenu();
          } 
        });

      }

    })
    .catch(err => {
      console.log(err)


    })
}

async function init() {
  await connectDb();
  mainMenu();
}

init()

// // Function to add an employee
// async function addEmployee() {
//   const employee = new Employee({
//     // Your database configuration
//   });

//   await client.connect();

//   const { firstName, lastName, roleId, managerId } = await inquirer.prompt([
//     {
//       type: 'input',
//       name: 'firstName',
//       message: "Enter the employee's first name:",
//     },
//     {
//       type: 'input',
//       name: 'lastName',
//       message: "Enter the employee's last name:",
//     },
//     {
//       type: 'input',
//       name: 'roleId',
//       message: "Enter the employee's role ID:",
//     },
//     {
//       type: 'input',
//       name: 'managerId',
//       message: "Enter the employee's manager ID (leave blank if none):",
//     },
//   ]);

//   const query = `
//     INSERT INTO employee (first_name, last_name, role_id, manager_id)
//     VALUES ($1, $2, $3, $4)
//   `;

//   await client.query(query, [firstName, lastName, roleId, managerId || null]);

//   console.log('Employee added successfully!');

//   await client.end();
// }

// // Call the function to add an employee
// addEmployee();