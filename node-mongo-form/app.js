const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connect to MongoDB (replace 'mongodb://localhost/mydatabase' with your MongoDB connection string)
mongoose.connect('mongodb://localhost/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

// Define Mongoose Schema
const userSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String
});
const User = mongoose.model('User', userSchema);

// Set up body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Render HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

// Handle form submission
// Handle form submission
app.post('/submit', (req, res) => {
    const { name, phone, email } = req.body;
    const newUser = new User({
        name: name,
        phone: phone,
        email: email
    });
    newUser.save()
        .then(() => {
            console.log('Data saved to MongoDB');
            res.redirect('/');
        })
        .catch(err => {
            console.error(err);
            res.send('Error saving data to MongoDB');
        });
});


// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
