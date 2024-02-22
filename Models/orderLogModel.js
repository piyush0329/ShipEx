const mongoose = require('mongoose')

const orderLogSchema = new mongoose.Schema(
    {
        orderId: {
            type: mongoose.ObjectId,
            ref: 'orders'
        },
        location:{
            type: mongoose.ObjectId,
            ref: 'office',
            default:null
        },
        order_status:{
            type:String
        },
        user:{
            type: mongoose.ObjectId,
            ref: 'users'
        }
    },
    {
        timestamps: true
    }
)



module.exports = mongoose.model('orderlog', orderLogSchema)