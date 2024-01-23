const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({

    products: [{

    }],
    payment: {
        type: String,
        default: 'Not Done',
        enum: ["Not Done", "Pending", "Cancelled", "Payment Done", "Refunded"]
    },
    buyer: {
        type: mongoose.ObjectId,
        ref: 'users',
    },
    status: {
        type: String,
        default: "Not Process",
        enum: ["Not Process", "Processing", "Shipped", "Out for delivery", "Delivered", "Cancel"]
    },
    totalAmount: {
        type: Number,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('orders', orderSchema)