var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bhaviksuiya2272@gmail.com',
      pass: 'Bhavik@2272'
    }
  });

  var mailOptions = {
    from: 'bhaviksuiya2272@gmail.com',
    to: 'bhaviksuiya222@outlook.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy! Hello Bro!!!'
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });