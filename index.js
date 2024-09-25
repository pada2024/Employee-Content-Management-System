


// Import and require Pool (node-postgres)
// We'll be creating a Connection Pool. Read up on the benefits here: https://node-postgres.com/features/pooling
const { Pool } = require('pg');
require("dotenv").config();
const inquirer = require('inquirer');

let db;

async function connectDb() {
  // Connect to database
  const pool = new Pool(
    {
      // TODO: Enter PostgreSQL username
      user: process.env.USER,
      // TODO: Enter PostgreSQL password
      password: process.env.PASSWORD,
      host: '127.0.0.1',
      database: 'employee_db',
      port: 5432
    },
    console.log(`Connected to the employees_db database.`)
  )

  db = await pool.connect()
}

async function mainMenu () {

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
  
  inquirer
    .prompt(actionQuestions)
    .then((answers) => {
  
      if (answers.action == "View all Departments") {
        // const sql = `INSERT INTO movies (movie_name)
        // VALUES ($1)`;
        const sql = "SELECT * FROM department";
        // const params = [body.movie_name];
  
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
        // const sql = `INSERT INTO movies (movie_name)
        // VALUES ($1)`;
        const sql = "SELECT * FROM role";
        // const params = [body.movie_name];
  
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