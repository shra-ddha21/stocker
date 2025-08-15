const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    //console.log("Signup Request Received:", { name, email, password });

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: "User already exists" });

    // Store password as it is (hashing happens in User.js)
    user = new User({ name, email, password });
    await user.save();

    //console.log("User Successfully Saved:", user);

    res.status(201).json({ msg: "Signup successful" });
  } catch (err) {
    //console.error("Signup Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //console.log("Login Request Received:", { email });

  try {
    const user = await User.findOne({ email });
    if (!user) {
      //console.log("User not found");
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    //console.log("Stored Hashed Password in DB:", user.password);
    //console.log("Entered Password for Login:", password);

    // Compare the entered password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    //console.log("Password Match Result:", isMatch);

    if (!isMatch) {
      //console.log("Password mismatch!");
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    //console.log("Login Successful, Token Generated");
    res.json({ token });
  } catch (err) {
    //console.error("Login Error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Logout (Handled on the frontend)
  router.post("/logout", (req, res) => {
  res.json({ msg: "Logged out successfully" });
});

module.exports = router;
