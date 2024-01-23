const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({

    buyer: {
        type: mongoose.ObjectId,
        ref: 'users',
    },
    order: {
        type: mongoose.ObjectId,
        ref: 'orders',
    },
    sessionId: {
        type: String,
        trim: true,
    },
    paymentStatus: {
        type: String,
        default: 'Not Done',
        enum: ["Not Done", "Pending", "Cancelled", "Payment Done","Refunded"]
    },
    refundId: {
       type:String,
       default:null
    },

}, {
    timestamps: true
})

module.exports = mongoose.model('paymentstatus', paymentSchema)