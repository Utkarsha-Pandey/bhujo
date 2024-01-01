const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
<<<<<<< HEAD
=======
const colors = require('colors')
const path = require("path");
>>>>>>> 3e3525b7bb41c90877aec561986f88bb1ecd61d2
const connectDb = require("./config/connectDb");

//config dot env file
dotenv.config();

//database call
connectDb();

//rest object
const app = express()

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

//routes
//accessing the routes made in userRoutes
<<<<<<< HEAD
app.use("/api/v1/users",require("./routes/userRoutes"));
=======

app.get("/",  (req, res) =>{
    res.send("hello");
})

app.use('/api/v1/users', require('./routes/userRoutes'));
<<<<<<< HEAD
app.use('/api/v1/transaction', require('./routes/transactionRoutes'));
=======
>>>>>>> 3e3525b7bb41c90877aec561986f88bb1ecd61d2
>>>>>>> 678a57aada0d4b78589e98dea0a0070052f5f614

//port
const PORT = 8000 || process.env.PORT;

//listen server
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});
