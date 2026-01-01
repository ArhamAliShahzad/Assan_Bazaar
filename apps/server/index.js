const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

connectDB();

app.use(cors());
app.use(express.json());

// --- Socket.io Rooms & Live Logic ---
io.on('connection', (socket) => {
    console.log('⚡ New Socket Connected:', socket.id);

    // 1. Join Order Room (Chat aur Tracking ke liye)
    socket.on('join_order', (orderId) => {
        socket.join(orderId);
        console.log(`👤 User joined room: ${orderId}`);
    });

    // 2. Live Tracking Logic
    socket.on('send_location', (data) => {
        // data = { orderId, lat, lng }
        // Sirf us order ke room mein location bhejo
        socket.to(data.orderId).emit(`receive_location_${data.orderId}`, data);
    });

    // 3. Live Chat Logic (Private to Order ID)
    socket.on('send_message', (data) => {
        // data = { orderId, text, sender, time }
        console.log(`📩 Chat [${data.orderId}]: ${data.text}`);

        // room mein maujood doosre bande ko message bhejna
        socket.to(data.orderId).emit('receive_message', data);
    });

    socket.on('disconnect', () => {
        console.log('❌ User disconnected');
    });
});

// Routes
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);

// Health Check
app.get('/', (req, res) => res.send('Flash Delivery Server is Running...'));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Flash Server Active on Port ${PORT}`));