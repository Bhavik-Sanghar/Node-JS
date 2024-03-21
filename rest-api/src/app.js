const express = require("express");
const port = process.env.PORT || 3000;
require("./db/conn");

const app = express();
const route = require('./router/Routs');


app.use(route);
app.use(express.json());


//App Serve
app.listen(port, () => {
  console.log(`App is run on port ${port}` );
});
