// mycallback.js
function performOperation(a, b, callback) {
    const result = a + b;
    callback(result);
  }
  
  module.exports = performOperation;
  