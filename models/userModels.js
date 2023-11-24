const mongoose= require('mongoose')

//schema 
const userschema = new mongoose.Schema({
    
    name: {
        type: String,
        required:[true,"name is required"],
    },
    email: {
        type: String,
        required:[true,"email is required"],
        unique: true,
    },
    password: {
        type: String,
        required:[true,"password is required"],
    },

},
{
timestamps: true,
})

//export
const userModel = mongoose.model('userdata',userschema)
module.exports = userModel