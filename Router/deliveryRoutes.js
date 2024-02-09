const express = require('express')
const { requireSignIn, isAdmin } = require('../middleware/authMiddleware')
const { createVehicleController, getAllVehiclesController, getVehiclesController, getSingleVehicleController, orderMappingController, orderLogsController, getOrderVehiclesController, getVehicleOrderController,updateVehicleController } = require('../controller/deliveryController')

const deliveryRouter = express.Router()


deliveryRouter.post('/add-vehicle', requireSignIn, isAdmin, createVehicleController)
deliveryRouter.get('/get-free-vehicle', requireSignIn, isAdmin, getVehiclesController)
deliveryRouter.get('/get-all-vehicle', requireSignIn, isAdmin, getAllVehiclesController)
deliveryRouter.put('/update-vehicle', requireSignIn, isAdmin, updateVehicleController)
deliveryRouter.get('/get-working-vehicle', requireSignIn, isAdmin, getOrderVehiclesController)
deliveryRouter.get('/get-vehicle/:vehicleId', requireSignIn, isAdmin, getSingleVehicleController)
deliveryRouter.post('/map-orders', requireSignIn, isAdmin, orderMappingController)
deliveryRouter.get('/get-vehicle-orders/:vehicleId', requireSignIn, isAdmin, getVehicleOrderController)
deliveryRouter.post('/order-log', requireSignIn, isAdmin, orderLogsController)



module.exports.deliveryRouter = deliveryRouter