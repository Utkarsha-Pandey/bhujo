const jwt = require('jsonwebtoken');
const userModel = require("../models/userModels");

const googleLoginController = async (req, res) => {
    const { email, name, sub: googleId } = req.body;

    try {
        let user = await userModel.findOne({ email });

        if (!user) {
            user = new userModel({
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

        res.status(200).json({
            success: true,
            user: {
                _id: user._id,
                email: user.email,
                name: user.name,
                googleId: user.googleId,
            },
            token,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error,
        });
    }
};

module.exports = { googleLoginController };
