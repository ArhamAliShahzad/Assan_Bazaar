const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// 1. Create New Order
router.post('/create', async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        const io = req.app.get('socketio');
        if (io) io.emit('new_order_alert', savedOrder);
        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 2. Order History
router.get('/history/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const orders = await Order.find({
            $or: [{ customer: userId }, { rider: userId }]
        }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 3. Market
router.get('/market', async (req, res) => {
    try {
        const orders = await Order.find({ status: 'pending', rider: null }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 4. Update Status (With Multi-Rider Conflict Check)
router.put('/update-status/:id', async (req, res) => {
    try {
        const { status, riderId } = req.body;
        const checkOrder = await Order.findById(req.params.id);

        // Agar kisi aur ne accept kar liya hai
        if (status === 'accepted' && checkOrder.rider) {
            return res.status(400).json({ message: "Too late! Order already taken by another rider." });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status, rider: riderId },
            { new: true }
        );

        const io = req.app.get('socketio');
        if (io) {
            io.emit('order_updated', updatedOrder);
            if (status === 'accepted') io.emit('order_taken', req.params.id);
        }
        res.json(updatedOrder);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;