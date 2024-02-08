const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async ()=>{
 
    try { 
        const conn = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`Connected to Database ${conn.connection.host}`)
    }catch(error){
        console.log(`Error in MongoDB ${error}`)
    }
}

module.exports = connectDB