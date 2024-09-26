


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
console.log('sql', sql);
        db.query(sql, (err, result) => {
          console.log('insideRoleQuery');
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