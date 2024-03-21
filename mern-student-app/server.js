// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB setup
const MONGODB_URI = 'mongodb://localhost:27017/Stud';
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define Schema and Model for Student
const studentSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String
});
const Student = mongoose.model('Student', studentSchema);

// Routes
app.post('/students', async (req, res) => {
    const { name, email, phone } = req.body;
    try {
        const student = new Student({ name, email, phone });
        await student.save();
        res.status(201).json(student);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
