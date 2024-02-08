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
        enum: ["Created","Not Process", "Shipped", "Out for delivery", "Delivered", "Cancelled"]
    },
    totalAmount: {
        type: Number,
    },
    refundDetails:{
        type:Object,
        default:null
    },
    expectedDelivery:{
        type:Date,
        default:null
    },
    timeLine:[
        {
            
        }
    ]
}, {
    timestamps: true
})

module.exports = mongoose.model('orders', orderSchema)