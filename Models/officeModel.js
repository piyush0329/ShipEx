const mongoose = require('mongoose')

const officeSchema = new mongoose.Schema({

    officeId: {
        type: Number,
        required: true,
        unique:true,
        trim: true,
    },   
    officeName: {
        type: String,
        required: true,
        trim: true,
    },   
    state: {
        type: String,
        required: true,
        trim: true,
    },   
    city: {
        type:String,
        required: true,
        trim: true,
    }, 
    pincode: {
        type: String,
        required: true,
        trim: true,
    },
    country: {
        type: String,
        required: true,
    },    
    locality: {
        type:String,
        required: true,
        trim: true,
    },   
    longitude: {
        type:Number,
        required: true,
        trim: true,
    },   
    latitude: {
        type:Number,
        required: true,
        trim: true,
    },   
}, {
    timestamps: true
})



module.exports = mongoose.model('office', officeSchema)