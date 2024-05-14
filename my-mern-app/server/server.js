const express = require('express');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors'); // Import cors
const port = 5001;

// Middleware
app.use(express.json());
app.use(cors());


// MongoDB connection
mongoose.connect('mongodb://localhost/mern-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bhaviksuiya22@gmail.com',
    pass: 'uoqa mmkw drgy jlbk',
  },
});

// Email route
app.post('/send-email', async (req, res) => {
    console.log(req.body)
    const { name, email } = req.body;
    
    const mailOptions = {
      from: 'bhaviksuiya22@gmail.com',
      to: email, // Use the user's email address as the recipient
      subject: 'Hello from MERN App',
      text: `Hello ${name}!`,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error sending email' });
    }
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});