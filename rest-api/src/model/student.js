const mongoose = require("mongoose");
const validator = require('validator');

const StudentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value);
            },
            message: "Invalid Email"
        }
    },
    phone: {
        type: Number,
        minlength: 10,
        required: true
    }
});

const Student = mongoose.model("Student", StudentSchema);

module.exports = Student;
