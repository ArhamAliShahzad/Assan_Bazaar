const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// 1. Order Place Karna
router.post('/create', async (req, res) => {
    try {
        const newOrder = new Order(req.body);
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(500).json({ message: "Order Fail", error: err.message });
    }
});


// 2. Rider ke liye Pending Orders
router.get('/pending', async (req, res) => {
    try {
        const orders = await Order.find({ status: 'pending' }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
});

// 3. Bill Update API (Naya Route)
router.put('/update-amount/:id', async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { totalAmount: req.body.totalAmount },
            { new: true }
        );
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
});

// 4. Customer History
router.get('/user/:userId', async (req, res) => {
    try {
        const orders = await Order.find({ customer: req.params.userId }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err);
    }
});

// A. Rider Specific View (Pending + Uske apne accepted orders)
router.get('/rider-view', async (req, res) => {
    try {
        const orders = await Order.find({
            status: { $in: ['pending', 'accepted'] }
        }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (err) { res.status(500).json(err); }
});

// B. Flexible Status Update (Accept, Reject, Deliver sab isi se hoga)
router.put('/update-status/:id', async (req, res) => {
    try {
        const { status } = req.body;
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status: status },
            { new: true }
        );
        res.status(200).json(updatedOrder);
    } catch (err) { res.status(500).json(err); }
});

// 5. Order Status Update (Delivered)
router.put('/update/:id', async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            { status: 'delivered' },
            { new: true }
        );
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;