const bcrypt = require('bcrypt')
require('dotenv').config()
 const hashPassword = async(password)=>{
    try{
        const saltRounds =process.env.SALT_ROUNDS
        const hashedPassword = await bcrypt.hash(password,saltRounds)
        return hashedPassword
    }catch(error){
        console.log(error)
    }
}

 const comparePassword = async (password,hashedPassword)=>{
    return bcrypt.compare(password,hashedPassword)
}

module.exports.hashPassword= hashPassword
module.exports.comparePassword = comparePassword