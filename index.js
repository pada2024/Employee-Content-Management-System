// Import and require Pool (node-postgres)
// We'll be creating a Connection Pool. Read up on the benefits here: https://node-postgres.com/features/pooling
const { Pool } = require('pg');
require("dotenv").config();
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
