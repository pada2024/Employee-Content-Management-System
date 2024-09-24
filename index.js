


// Import and require Pool (node-postgres)
// We'll be creating a Connection Pool. Read up on the benefits here: https://node-postgres.com/features/pooling
const { Pool } = require('pg');
require("dotenv").config();
const inquirer = require('inquirer');

const actionQuestions = [{
  name: "action",
  type: "list",
  message: "Welcome! What would you like to do?",
  choices: [
      "View all Employees",
      "Add an Employee",
      "Exit"
  ]
}];

inquirer
  .prompt(actionQuestions)
  .then((answers) => {
    // Use user feedback for... whatever!!
    // connect to DB
    // query for all emplpyees
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });


// Connect to database
const pool = new Pool(
  {
    // TODO: Enter PostgreSQL username
    user: process.env.USER,
    // TODO: Enter PostgreSQL password
    password: process.env.PASSWORD,
    host: 'localhost',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
)

pool.connect();

// Create a movie

const sql = `INSERT INTO movies (movie_name)
    VALUES ($1)`;
const params = [body.movie_name];

pool.query(sql, params, (err, result) => {
  if (err) {

    return;
  }


});


// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
