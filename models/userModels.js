const mongoose = require('mongoose');

// schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true,
    },
    profilePic: {
        type: String, // URL of the profile picture
        default: 'images/user.png',
    },
    friendRequests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userdata'
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userdata'
    }],
}, {
    timestamps: true,
});

// export
const userModel = mongoose.model('userdata', userSchema);
module.exports = userModel;
