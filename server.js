const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
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

app.get("/",  (req, res) =>{
    res.send("hello");
})

app.use('/api/v1/users', require('./routes/userRoutes'));

app.use('/api/v1/transaction', require('./routes/transactionRoutes'));
//port
const PORT = 8000 || process.env.PORT;

//listen server
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});
