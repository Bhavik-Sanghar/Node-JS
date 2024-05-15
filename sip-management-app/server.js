// server.js
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Route to insert data
app.post('/sip', (req, res) => {
    const { FolioNumber, SchemeName, Amount, ValueDate, UnitAllocation, NAV } = req.body;
    const query = `INSERT INTO SIPManagement (FolioNumber, SchemeName, Amount, ValueDate, UnitAllocation, NAV) VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(query, [FolioNumber, SchemeName, Amount, ValueDate, UnitAllocation, NAV], (err, result) => {
        if (err) {
            res.status(500).send('Error inserting data');
            console.error(err);
            return;
        }
        res.status(200).send('Data inserted successfully');
    });
});

// Route to retrieve data
app.get('/sip', (req, res) => {
    const query = `SELECT * FROM SIPManagement`;
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving data');
            console.error(err);
            return;
        }
        res.status(200).json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
