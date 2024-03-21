const mongoose = require('mongoose');
// Define schema for SBI collection
const sbiSchema = new mongoose.Schema({
    // Define fields here based on the structure of your documents in the SBI collection
    // For example:
    Account_Number: { type: Number, required: true },
    Name : { type: String, required: true },
    Age : Number
    // Add more fields as needed
});

// Create Mongoose model for SBI collection
const SBI = mongoose.model('SBI', sbiSchema);

module.exports = SBI;
