const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Local MongoDB URL ya Atlas URL yahan aayega
        const conn = await mongoose.connect('mongodb://localhost:27017/aasaan_bazar');
        console.log(`MongoDB Connected: ${conn.connection.host} ✅`);
    } catch (error) {
        console.error(`Error: ${error.message} ❌`);
        process.exit(1);
    }
};

module.exports = connectDB;