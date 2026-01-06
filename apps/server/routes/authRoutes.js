const express = require('express');
const router = express.Router();
const User = require('../models/User');

// SIGNUP
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, role, phone } = req.body;
        const user = new User({ name, email, password, role, phone });
        await user.save();
        // Clear response structure
        res.json({
            user: { id: user._id, _id: user._id, name: user.name, role: user.role }
        });
    } catch (err) {
        res.status(500).json({ msg: "Signup Failed" });
    }
});

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const { identifier, password } = req.body;
        // Email ya Phone se login
        const user = await User.findOne({ $or: [{ email: identifier }, { phone: identifier }] });

        if (!user || user.password !== password) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }

        // IMPORTANT: Sending both id and _id for safety
        res.json({
            user: { id: user._id, _id: user._id, name: user.name, role: user.role }
        });
    } catch (err) {
        res.status(500).json({ msg: "Login Failed" });
    }
});

module.exports = router;