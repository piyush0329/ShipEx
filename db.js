const mongoose = require('mongoose')


const connectDB = async ()=>{
 
    try { 
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/loginApp')
        console.log(`Connected to Database ${conn.connection.host}`)
    }catch(error){
        console.log(`Error in MongoDB ${error}`)
    }
}

module.exports = connectDB