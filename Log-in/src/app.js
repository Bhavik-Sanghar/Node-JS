require('./db/conn');
// Importing necessary modules
const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const Register = require("./model/Register");

// Creating Express app instance
const app = express();

// Setting up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setting up view engine and views directory
const viewPath = path.join(__dirname, "/templates/views");
app.set("views", viewPath);
app.set("view engine", "hbs");

// Routes

// Home route
app.get("/", (req, res) => {
  res.render("index");
});

// Registration form route
app.get("/register", (req, res) => {
  res.render("register");
});

// Handling registration form submission
app.post("/register", async (req, res) => {
  const { name, email, phone, password, confirmpassword } = req.body;
  
  if (password === confirmpassword) {
    try {
      // Hashing the password
      const hashedPassword = await bcrypt.hash(password, 10);
      const data = new Register({ name, email, phone, password: hashedPassword, confirmpassword });
      await data.save();
      res.status(201).render("index");
    } catch (error) {
      res.status(500).send("Failed to register user");
    }
  } else {
    res.send("Passwords are not the same");
  }
});

// Login form route
app.get("/login", (req, res) => {
  res.render("login");
});

// Handling login form submission
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Register.findOne({ email });

    if (!user) {
      res.send("User not found");
    } else {
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (isPasswordMatch) {
        res.render("index");
      } else {
        res.send("Invalid email or password");
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

// Starting the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
