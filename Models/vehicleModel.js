const mongoose = require('mongoose')

const vehicleSchema = new mongoose.Schema({
    vehicleNo: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    model: {
        type: String,
        required: true,
        trim: true,
    },
    capacity: {
        type: Number,
        required: true, 
    },
    driver: {
        type: String,
        required: true,
        trim: true,
    },
    status: {
        type: String,
        required: true,
        trim: true,
        default:"Free"
    },
}, {
    timestamps: true
})



module.exports = mongoose.model('vehicles', vehicleSchema)