require('dotenv').config();
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER,
      pass: process.env.PASS
    }
  });

  var mailOptions = {
    from: 'bhaviksuiya22@gmail.com',
    to: 'bhaviksuiya222@outlook.com',
    subject: 'Sending Email using Node.js',
    text: 'Test ENV file 💌😎'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });