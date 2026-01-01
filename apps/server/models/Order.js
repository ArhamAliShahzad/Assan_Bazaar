const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rider: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    orderType: { type: String, default: 'normal' }, // 'normal' ya 'custom'
    customRequest: { type: String }, // 5 roti, dahi wagera yahan aye ga
    address: { type: String, required: true },
    totalAmount: { type: Number, default: 0 },
    status: { type: String, default: 'pending' },
    createdAt: { type: Date, default: Date.now }
    // Items ko humne nikal diya hai taake bazaar order block na ho
}, { strict: false }); // strict: false se extra fields error nahi dengi

module.exports = mongoose.model('Order', OrderSchema);