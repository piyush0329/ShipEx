const mongoose = require('mongoose')

const deliveryMappingSchema = new mongoose.Schema(
    {
        vehicleId: {
            type: mongoose.ObjectId,
            ref: 'vehicles'
        },
        orders: [
            {
                type: mongoose.ObjectId,
                ref: 'orders'
            }
        ],
        shipping_status: {
            type: String
        },
        arrival_time: {
            type: Date
        },
        departure_time: {
            type: Date
        },
    },
    {
        timestamps: true
    }
)



module.exports = mongoose.model('deliveryMapping', deliveryMappingSchema)