const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/userModels'); // Adjust the path to your User model
const router = express.Router();

// Google sign-in route
router.post('/google-signin', async (req, res) => {
    const { email, name, sub: googleId } = req.body;
    
    try {
        let user = await User.findOne({ email });

        if (!user) {
            user = new User({
                email,
                name,
                googleId,
            });
            await user.save();
        } else if (!user.googleId) {
            user.googleId = googleId;
            await user.save();
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({
            user: {
                _id: user._id,
                email: user.email,
                name: user.name,
                googleId: user.googleId,
            },
            token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
});

module.exports = router;
