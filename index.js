
// Import and require Pool (node-postgres)
const { Pool } = require('pg');
require("dotenv").config();
const inquirer = require('inquirer');
const { first } = require('rxjs');

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
const addEmployeeQuestions = [
  {
    type: 'input',
    name: 'firstName',
    message: "Enter the employee's first name:",
  },
  {
    type: 'input',
    name: 'lastName',
    message: "Enter the employee's last name:",
  },
  {
    type: 'input',
    name: 'roleId',
    message: "Enter the employee's role ID:",
  },
  {
    type: 'input',
    name: 'managerId',
    message: "Enter the employee's manager ID (leave blank if none):",
  },
];

// Department Prompt
const addDepartmentQuestions = [
  {
    type: 'input',
    name: 'name',
    message: "Enter the Department name:",
  },
];
// Role Prompt
const addRoleQuestions = [
  {
    type: 'input',
    name: 'title',
    message: "Enter the title:",
  },
  {
    type: 'input',
    name: 'salary',
    message: "Enter the salary:",
  },
  {
    type: 'input',
    name: 'departmentId',
    message: "Enter new department ID (*must be unique):",
  },

];

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

  try {
    //  Grab the action or what the user wants to do I.e add an employee
    const answers = await inquirer

      .prompt(actionQuestions);

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

    } else if (answers.action == "View all Roles") {
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


    } else if (answers.action == "View all Employees") {
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

    } else if (answers.action == "Add an Employee") {
      const { firstName, lastName, roleId, managerId } = await inquirer.prompt(addEmployeeQuestions);
      console.log(firstName, lastName, roleId, managerId);

      // Code to resolve duplicate key error I was getting. This code manually resets the sequence to the maximum current ID in the employee table +1, to ensure a unique ID 
      await db.query(`
        SELECT setval(pg_get_serial_sequence('employee', 'id'), coalesce(max(id), 0) + 1, false) FROM employee;
    `);

      const query = `
    INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES ($1, $2, $3, $4)
    RETURNING id
`;
      const result = await db.query(query, [firstName, lastName, roleId, managerId || null]);
      const newEmployeeId = result.rows[0].id; 
      console.log(`New employee ID: ${newEmployeeId}`);

      console.log('Employee added successfully!');
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

    } else if (answers.action == "Add a Department") {
      const { name, } = await inquirer.prompt(addDepartmentQuestions);
      console.log(name);
      const sql = "INSERT INTO department";

      await db.query(`
        SELECT setval(pg_get_serial_sequence('department', 'id'), coalesce(max(id), 0) + 1, false) FROM department;
    `);

    const query = `
    INSERT INTO department (name)
    VALUES ($1)
    RETURNING id
`;
      const result = await db.query(query, [name || null]);
      const newDepartmentId = result.rows[0].id; 
      console.log(`New department ID: ${newDepartmentId}`);

      console.log('Department added successfully!');

      db.query(sql, (err, result) => {
        if (err) {
          console.log(err)
          return;
        } else {
          console.table(result.rows)
          mainMenu();
        }
      });

    } else if (answers.action == "Add an Employee's Role") {

      const { title, salary, departmentId } = await inquirer.prompt(addRoleQuestions);
      console.log(title, salary, departmentId);

      // Code to resolve duplicate key error I was getting. This code manually resets the sequence to the maximum current ID in the employee table +1, to ensure a unique ID 
      await db.query(`
        SELECT setval(pg_get_serial_sequence('role', 'id'), coalesce(max(id), 0) + 1, false) FROM role;
    `);

      const query = `
    INSERT INTO role (title, salary, department_id)
    VALUES ($1, $2, $3)
    RETURNING id
`;
      const result = await db.query(query, [title, salary, departmentId || null]);
      const newRoleId = result.rows[0].id; 
      console.log(`New Role ID: ${newRoleId}`);

      console.log('New Role added successfully!');
      const sql = "INSERT INTO role";
      db.query(sql, (err, result) => {
        if (err) {
          console.log(err)
          return;
        } else {
          console.table(result.rows)
          mainMenu();
        }
      });

    } else if (answers.action == "Update an Employee's Role") {
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

    } else if (answers.action == "Delete an Employee") {
      const sql = "DELETE FROM employee WHERE id = $1";
      db.query(sql, params, (err, result) => {
        if (err) {
          console.log(err)
          return;
        } else if (!result.rowCount) {
          res.json({
            message: 'Employee not found'
          });
        } else {
          res.json({
            message: 'deleted',
            changes: result.rowCount,
            id: req.params.id
          });
        }
        mainMenu();

      });

    }
  } catch (error) {
    console.error(error);
  }
}

async function init() {
  await connectDb();
  mainMenu();
}

init()