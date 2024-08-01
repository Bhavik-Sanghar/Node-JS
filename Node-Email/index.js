// Import the dotenv library to load environment variables from a .env file
require('dotenv').config();

// Import the nodemailer library for sending emails
const nodemailer = require('nodemailer');

// Create a transporter object using the Gmail service
// This object will be used to send emails
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    // Use the EMAIL and PASSWORD environment variables for authentication
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

// Define the email options
// This object contains the sender, recipient, subject, and body of the email
const mailOptions = {
  from: process.env.EMAIL, // Sender's email address
  to: process.env.EMAIL_TO, // Recipient's email address
  subject: 'Sending Email using Node.js - Improved', // Email subject
  text: 'Test ENV file 💌😎 Improved' // Email body
};

// Send the email using the transporter object and the mail options
// The callback function handles the response from the email server
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    // If there is an error, log it to the console
    console.log(error);
  } else {
    // If the email is sent successfully, log the response to the console
    console.log('Email sent: ' + info.response);
  }
});

