const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 4000;

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'admin',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'my_database',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  }
  console.log('Connected to the database');
});

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Node.js app!');
});

app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      res.status(500).send('Error fetching users');
      return;
    }
    res.json(results);
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is in use. Trying another port.`);
    const newPort = PORT + 1;
    app.listen(newPort, () => {
      console.log(`Server started on fallback port http://localhost:${newPort}`);
    });
  } else {
    throw err;
  }
});
