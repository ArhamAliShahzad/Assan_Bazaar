const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },

    orderType: { type: String, enum: ['restaurant', 'custom'], default: 'restaurant' },

    // Burger orders ke liye ye array use hoga
    items: [{
        name: String,
        price: Number,
        quantity: { type: Number, default: 1 }
    }],

    // Custom orders ke liye ye string use hogi
    customRequest: { type: String }, // Required hata diya gaya hai

    address: { type: String, required: true },
    phone: { type: String, required: true },
    totalAmount: { type: Number, default: 0 },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'picked', 'delivered', 'cancelled'],
        default: 'pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);