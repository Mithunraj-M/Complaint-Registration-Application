// signup.js

const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");

// POST route to create a new user
router.post("/", async (req, res) => {
  const { firstName, lastName, email, phone, dob, password } = req.body;

  try {
    // Check if user with the given phone number already exists
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Phone number already registered" });
    }

    // Create a new user instance
    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,
      dob,
      password,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
