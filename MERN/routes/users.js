const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Define GET route handler for retrieving user data
router.get('/', async (req, res) => {
  try {
    // Query the database to retrieve user data
    const users = await User.find();

    // Send the retrieved user data as a response
    res.json(users);
  } catch (error) {
    // If an error occurs, send an error response
    console.error('Error retrieving user data:', error);
    res.status(500).send('An error occurred while retrieving user data');
  }
});

// Define POST route handler for creating a new user
router.post('/', async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone
    });
    await newUser.save();
    res.send('User data saved successfully!');
  } catch (error) {
    console.error('Error saving user data:', error);
    res.status(500).send('An error occurred while saving user data');
  }
});

module.exports = router;
