const mongoose = require("mongoose");

const RegisterSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone : {
        type : Number,
        require : true
    },
    password :  {
        type: String,
        required: true,
    }
} ,  { timestamps: true });

const Register = mongoose.model("Register" , RegisterSchema);

module.exports = Register;