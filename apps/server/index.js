const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// 1. Database Connect karein
connectDB();

// 2. Middleware
app.use(cors());
app.use(express.json());

// 3. Routes
// Pehle wali line kafi hai, doosri ko delete kar dein
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// 4. Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));