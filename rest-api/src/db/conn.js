const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Student-Api").then(() => {
    console.log("Connection is done !!");
}).catch((e) => {
    console.log("Error !! :( ");
});

