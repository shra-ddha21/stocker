const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get user profile
router.get("/", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password"); // Corrected line
        if (!user) return res.status(404).json({ msg: "User not found" });

        res.json(user);
    } catch (err) {
        //console.error("Error fetching profile:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Update user profile
router.put("/", authMiddleware, async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findById(req.user.userId); // Use req.user.userId

        if (!user) return res.status(404).json({ msg: "User not found" });

        if (name) user.name = name;
        if (email) user.email = email;
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();
        res.json({ msg: "Profile updated successfully", user: { name: user.name, email: user.email } });
    } catch (err) {
        //console.error("Error updating profile:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;