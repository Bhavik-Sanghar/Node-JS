// app.js
const fs = require('fs');

function readFileCallback(err, data) {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
}

fs.readFile('example.txt', 'utf8', readFileCallback);
