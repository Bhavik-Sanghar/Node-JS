const mongoose = require("mongoose");
const SBI = require('./models/SBI');

const url = 'mongodb+srv://Bhavik:Bhavik%402272@cluster0.hphoc3k.mongodb.net/Bank?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(url)
  .then(() => console.log("Connected")) // Log "Connected" when the connection is successful
  .catch((err) => console.log(err)); // Log any errors that occur during the connection process
  
  const Sample = new SBI({
    Account_Number: 7213,
    Name: "MEENABEN",
    Age: 42
});

// Sample.save()
//     .then(() => console.log("Saved"))
//     .catch(err => console.error("Error saving Sample:", err));

  SBI.find({Age : {$gte : 22}})
    .then(data => {
        console.log("Data from SBI collection:", data);
    })
    .catch(err => {
        console.log("Error fetching data from SBI collection:", err);
    });


