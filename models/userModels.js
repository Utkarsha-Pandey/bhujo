const mongoose = require('mongoose');

// schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
    },
    password: {
        type: String,
    },
    googleId: {
        type: String,
        unique: true,
    },
}, {
    timestamps: true,
});

// export
const userModel = mongoose.model('userdata', userSchema);
module.exports = userModel;
