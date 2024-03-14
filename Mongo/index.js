const mongoose = require("mongoose");

// Database Address
const url = "mongodb://localhost:27017/Bhavik";

// Connecting to database
mongoose.connect(url).then(() => {
    console.log("Connected Successfully");
}).catch((err) => {
    console.log("Error in the Connection:", err);
});

// Calling Schema class
const Schema = mongoose.Schema;

// Creating Structure of the collection
const collection_structure = new Schema({
    name: {
        type: String,
        required: true
    },
    marks: {
        type: Number,
        default: 0
    }
});

const Collection = mongoose.model('Marks', collection_structure);

// // Creating a document
// Collection.create({
//     name: "Bhavik",
//     marks: 50
// }).then((createdDocument) => {
//     console.log("Document created:", createdDocument);
// }).catch((err) => {
//     console.log("Error creating document:", err);
// });

// // Updating a document
// Collection.updateOne({
//     name: "Bhavik"
// }, {
//     $set: {
//         marks: 25
//     }
// }).then((result) => {
//     console.log("Document updated:", result);
// }).catch((err) => {
//     console.log("Error updating document:", err);
// });




Collection.find({}).then((documents) => {
  console.log("Retrieved documents:");
  console.log(documents);
}).catch((err) => {
  console.log("Error retrieving data:", err);
});