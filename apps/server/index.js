const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

// 1. Database Connect (Pehle connect karein phir routes)
connectDB();

// 2. Middleware
app.use(cors());
app.use(express.json());

// 3. Socket Setup with more detail
const io = new Server(server, {
    cors: {
        origin: "*", // Testing ke liye stars theek hai
        methods: ["GET", "POST", "PUT"]
    }
});

// Socket ko app mein save karein taake routes mein use ho sake
app.set('socketio', io);

// Socket Event Logging
io.on('connection', (socket) => {
    console.log(`⚡ New Client Connected: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(' Client Disconnected');
    });
});

// 4. --- ROUTES ---
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

// 5. --- 404 Handler ---
app.use((req, res) => {
    console.log(` 404 Error: ${req.method} ${req.originalUrl}`);
    res.status(404).json({ msg: "Route not found", url: req.originalUrl });
});

// 6. Start Server
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`🚀 Server active on port ${PORT}`);
});