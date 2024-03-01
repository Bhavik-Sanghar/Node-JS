const express = require("express");
const app = express();
const path = require('path')
port = process.env.PORT  || 8000;
//path
const Newpath = (path.join(__dirname , "/public"));
app.use(express.static(Newpath))


//routing
app.get('/', (req, res) => {
    try {
        res.send("Hello, my first express app"); // Changed res.write to res.send
    } catch (error) {
        console.log(error);
    }
});



app.get('/bhavik', (req, res) => {
    try {
        res.send("Hello, my Bhavik"); // Changed res.write to res.send
    } catch (error) {
        console.log(error);
    }
});



app.listen(port, () => {
    console.log(`"Server is listening on port ${port}"`); // Changed the console.log message
});
