// app.js
const performOperation = require('./mycallback');

function customCallback(result) {
  console.log('The result is:', result);
}

performOperation(5, 3, customCallback);
