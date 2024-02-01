const express = require('express')
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware')
const { createVehicleController, getVehiclesController, getSingleVehicleController, orderMappingController } = require('../controller/deliveryController')

const deliveryRouter = express.Router()


deliveryRouter.post('/add-vehicle', requireSignIn, isAdmin, createVehicleController)
deliveryRouter.get('/get-all-vehicle', requireSignIn, isAdmin, getVehiclesController)
deliveryRouter.get('/get-vehicle/:vehicleId', requireSignIn, isAdmin, getSingleVehicleController)
deliveryRouter.post('/map-orders',requireSignIn,isAdmin,orderMappingController)



module.exports.deliveryRouter = deliveryRouter