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
    },
    {
        timestamps: true
    }
)



module.exports = mongoose.model('deliveryMapping', deliveryMappingSchema)