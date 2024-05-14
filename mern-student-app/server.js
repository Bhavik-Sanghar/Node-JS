// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cors());

const methodOverride = require('method-override');
app.use(methodOverride('_method'));


// Add this line after app.use(cors());
app.set('view engine', 'hbs');

// Modify the '/' route to render the Handlebars template
app.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.render('index', { students });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});


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
    console.log(req.body);
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


app.get('/all-students' , async (req,res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
})

app.delete('/students/:id', async (req, res) => {
    const studentId = req.params.id;
    try {
        const deletedStudent = await Student.findByIdAndDelete(studentId);
        if (!deletedStudent) {
            return res.status(404).json({ error: 'Student not found' });
        }
        res.status(200).json({ message: 'Student deleted successfully', deletedStudent });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
