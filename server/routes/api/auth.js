// auth.js, JN, 19.02.2024
const express = require('express');
const router = express.Router();
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../../models/user");

router.post("/register",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()-_+={}\[\]|\\;:"<>,./?]).*$/)
  ], async (req, res) => {
  try {
    // Check for validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: "Password is not strong enough", details: errors.array() })
    }

    const { email, password, firstName, lastName, age, gender } = req.body;

    // If the email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(403).json({ error: "Email already in use" });
    }

    // firstName, lastName, age, and gender can't be empty
    if (!firstName || !lastName || !age || !gender) {
      return res.status(400).json({ error: "First name, last name, age, and gender are required" });
    }

    // Age must be a number between 18 and 100
    if (isNaN(age) || age < 18 || age > 100) {
      return res.status(400).json({ error: "Age must be a number between 18 and 100" });
    }

    // Gender must be "Male", "Female", or "Other"
    if (!["Male", "Female", "Other"].includes(gender)) {
      return res.status(400).json({ error: "Invalid gender. Gender must be 'Male', 'Female', or 'Other'." });
    }

    // Create a new user
    const newUser = new User( { email, password, firstName, lastName, age, gender });
    await newUser.save();

    res.status(201).json({ message: "User registered succesfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }


})

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, error: "Invalid credentials" });
    }

    // Verify the password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ success: false, error: "Invalid credentials" });
    }

    // Create and sign the JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.SECRET);
    res.json({ success: true, token });

  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
})

module.exports = router;

// eof
