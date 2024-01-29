const  express =require('express')
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware')
const { createOfficeController, getOfficeController } = require('../controller/officeController')
const officeRouter = express.Router()
//api to create office
officeRouter.post('/create-office', requireSignIn, isAdmin, createOfficeController)
//api to get office details 
officeRouter.get('/get-office', requireSignIn, getOfficeController)


module.exports.officeRouter = officeRouter