// app.js
const express = require('express');
const mysql = require('mysql');
const hbs = require('hbs');

const app = express();
const port = 3000;

// MySQL connection configuration
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Bhavik@2272",
    database: "employeesdb" // Specify the name of your database
});

// Connect to MySQL database
con.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL database!");
});

// Set Handlebars as the view engine
app.set('view engine', 'hbs');

// Route to serve HTML page
// Route to serve HTML page
app.get('/', (req, res) => {
    con.query("SELECT * FROM employee", (err, result) => {
        if (err) {
            console.error("Error executing MySQL query:", err);
            res.status(500).send("An error occurred while fetching data from the database.");
            return;
        }

        console.log("Query results:", result); // Log query results to console

        // Render HTML page with data using Handlebars
        res.render('index', { data: result });
    });
});


// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
