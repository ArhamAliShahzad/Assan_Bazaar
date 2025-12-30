const express = require('express');
const router = express.Router();
const User = require('../models/User');

// --- SIGNUP ROUTE ---
router.post('/signup', async (req, res) => {
    const { name, email, password, role, phone } = req.body;

    try {
        // Validation: Check karein agar email ya phone pehle se hai
        let userExists = await User.findOne({ $or: [{ email }, { phone }] });
        if (userExists) {
            return res.status(400).json({ msg: "Ye Email ya Phone pehle se register hai!" });
        }

        const user = new User({ name, email, password, role, phone });
        await user.save();

        res.json({
            user: { id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone }
        });
    } catch (err) {
        res.status(500).json({ msg: "Database Error: Signup nahi ho saka" });
    }
});

// --- LOGIN ROUTE ---
router.post('/login', async (req, res) => {
    const { identifier, password } = req.body;
    try {
        // Email ya Phone dono par search karein
        let user = await User.findOne({ $or: [{ email: identifier }, { phone: identifier }] });

        if (!user) {
            return res.status(400).json({ msg: "Account nahi mila! Pehle Register karein." });
        }

        if (user.password !== password) {
            return res.status(400).json({ msg: "Ghalat Password! Dobara check karein." });
        }

        res.json({
            user: { id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone }
        });
    } catch (err) {
        res.status(500).json({ msg: "Server Error: Login nahi ho saka" });
    }
});

module.exports = router;