const mongoose = require('mongoose')
const colors = require('colors')
const connectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Server Running on ${mongoose.connection.host}`.bgCyan.white)
    }catch(error){
        console.log(`${error}`.bgRed);
    }
};

module.exports = connectDb;
//MONGO_URL=mongodb+srv://bhujo:bokgMHQDcL5WScCr@cluster0.xu2so1z.mongodb.net/expense