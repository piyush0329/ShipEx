const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({

    products: [{

    }],
    startLocation:{
        type:mongoose.ObjectId,
        ref:'office'
    },
    destinationLocation:{
        type:mongoose.ObjectId,
        ref:'office'
    },
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
    },
    refundDetails:{
        type:Object,
        default:null
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('orders', orderSchema)