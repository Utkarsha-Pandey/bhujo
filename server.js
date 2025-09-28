const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDb = require("./config/connectDb");
const path = require('path');
const http = require('http'); 
const { Server } = require('socket.io'); 

//config dot env file
dotenv.config();

//database call
connectDb();

//rest object
const app = express();

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Create HTTP server for socket.io
const server = http.createServer(app);

// Setup socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // React frontend URL
    methods: ["GET", "POST"],
  },
});

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Example: send welcome message
  socket.emit("notification", { message: "Welcome! You are connected to server." });

  // Disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

//routes
app.get("/", (req, res) => {
  res.send("hello");
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/v1/users', require('./routes/userRoutes'));
app.use('/api/v1/transaction', require('./routes/transactionRoutes'));

// Example: Emit notification on transaction (you can place inside routes later)
app.post("/api/v1/test-notify", (req, res) => {
  io.emit("notification", { message: "A new transaction was added!" });
  res.json({ success: true, msg: "Notification sent" });
});

//port
const PORT = process.env.PORT || 8000;

//listen server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
