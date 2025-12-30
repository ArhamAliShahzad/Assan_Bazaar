const express = require('express');
const router = express.Router();
const User = require('../models/User');

// --- SIGNUP ROUTE ---
router.post('/signup', async (req, res) => {
    const { name, email, password, role, phone } = req.body;

    try {
        // 1. Check karein ke user pehle se to nahi bana hua (Email ya Phone se)
        let user = await User.findOne({
            $or: [{ email: email }, { phone: phone }]
        });

        if (user) {
            return res.status(400).json({ msg: "Bhai, ye User pehle se majood hy!" });
        }

        // 2. Naya User banayein
        user = new User({
            name,
            email,
            password, // Password abhi plain text hy
            role,
            phone
        });

        // 3. Database mein save karein
        await user.save();

        // 4. Jawab mein user ka data bhejein
        res.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone
            }
        });

    } catch (err) {
        console.error("Signup Error:", err.message);
        res.status(500).json({ msg: "Server mein koi masla aa gaya hy!" });
    }
});

// --- LOGIN ROUTE ---
router.post('/login', async (req, res) => {
    const { identifier, password } = req.body;
    try {
        let user = await User.findOne({
            $or: [{ email: identifier }, { phone: identifier }]
        });

        if (!user) {
            return res.status(400).json({ msg: "User nahi mila! Pehle Signup karein." });
        }

        if (user.password !== password) {
            return res.status(400).json({ msg: "Ghalat Password!" });
        }

        res.json({
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone
            }
        });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;