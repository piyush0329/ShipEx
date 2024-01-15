const mongoose = require('mongoose')

const officeSchema = new mongoose.Schema({

    startLocation: {
        type: mongoose.ObjectId,
        ref:'office',
        required:true
    },   
    destinationLocation: {
        type: mongoose.ObjectId,
        ref:'office',
        required:true   
    },  
    weight:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,  
    },
    shipmentValue:{
        type:Number,
        required:true,  
    },
    userid:{
        type:mongoose.ObjectId,
        ref:'users',
        required:true,  
    },
}, {
    timestamps: true
})



module.exports = mongoose.model('products', officeSchema)