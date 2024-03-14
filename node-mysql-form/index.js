const express = require('express');
const mysql = require('mysql');
const hbs = require('hbs');

const app = express();
const port = 3000;

// Set Handlebars as the view engine
app.set('view engine', 'hbs');

// MySQL connection configuration
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Bhavik@2272", // Update with your MySQL password
    database: "mydatabase"
});

// Connect to MySQL database
con.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL database!");
});
// Assuming your CSS files are located in a directory named 'public'
app.use(express.static('public'));


// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Route to serve HTML form
app.get('/', (req, res) => {
    res.render('index');
});

// Route to handle form submission
app.post('/submit', (req, res) => {
    const { name, phone, email } = req.body;
    const sql = "INSERT INTO users (name, phone, email) VALUES (?, ?, ?)";
    con.query(sql, [name, phone, email], (err, result) => {
        if (err) throw err;
        console.log("Data inserted successfully!");
        res.redirect('/');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
