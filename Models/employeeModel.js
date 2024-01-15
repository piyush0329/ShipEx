const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({

    aadharNumber: {
        type: String,
        required: true,
        trim: true,
    },
    dlNumber: {
        type: String,
        required: true,
    },
    address: {
        type:String,
        required: true,
    },   
}, {
    timestamps: true
})



module.exports = mongoose.model('employeeDetails', employeeSchema)


