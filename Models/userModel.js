const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
    },
    roll: {
        type: Number,
        required: true,
    },
    classname: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    role:{
        type:Number,
        default:0,
    },
    employeeDetails:{
        type:mongoose.ObjectId,
        ref:'employeeDetails',
        default:null,
    },

}, {
    timestamps: true
})



module.exports = mongoose.model('users', userSchema)


