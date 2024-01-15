const JWT = require('jsonwebtoken')
const userModel = require('../Models/userModel')


const requireSignIn = async (req, res, next) => {

    try {
        const decode = await JWT.verify(req.headers.authorization, "ANISIFHFSFSOFSFO")
        req.user = decode
        next()
    } catch (error) {
        console.log("error in require sign in middlware" )
        console.log(error)
    }

}

const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id)
        if(user.role===1){
            next()
        }
        else{   
            return res.status(401).send({
                success:false,
                message:"Unauthorized access"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "error in admin middleware"
        })
    }
}

const isEmployee =async(req,res,next)=>{
    try {
        const user = await userModel.findById(req.user._id)
        if(user.role===2){
            next()
        }
        else{  
            return res.status(401).send({
                success:false,
                message:"Unauthorized access"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in Employee Middleware"
        })
    }

}
const isUser =async(req,res,next)=>{
    try {
        const user = await userModel.findById(req.user._id)
        if(user.role===0){
            next()
        }
        else{  
            return res.status(401).send({
                success:false,
                message:"Unauthorized access"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in User Middleware"
        })
    }

}



module.exports.requireSignIn = requireSignIn
module.exports.isAdmin = isAdmin
module.exports.isEmployee = isEmployee
module.exports.isUser = isUser