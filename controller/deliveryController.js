const deliveryMappingModel = require("../Models/deliveryMappingModel")
const orderModel = require("../Models/orderModel")
const vehicleModel = require("../Models/vehicleModel")


const createVehicleController = async (req, res) => {

    try {
        const { vehicleNo, model, capacity, driver } = req.body

        const existingVehicle = await vehicleModel.findOne({ vehicleNo })
        if (existingVehicle) {
            return res.status(200).send({
                success: false,
                message: "Vehicle Already Registered"
            })
        }
        const vehicle = await new vehicleModel({ vehicleNo: vehicleNo, model: model, capacity: capacity, driver: driver }).save()
        res.status(200).send({
            success: true,
            message: "Vehicle Created Successfully",
            vehicle
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Creating Vehicle",
            error
        })
    }
}
const getVehiclesController = async (req, res) => {
    try {
        const vehicles = await vehicleModel.find({})
        res.status(200).send({
            success: true,
            message: "Vehicles Fetched Successfully",
            vehicles
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting Vehicles",
            error
        })
    }
}
const getSingleVehicleController = async (req, res) => {
    try {
        const { vehicleId } = req.params
        const vehicle = await vehicleModel.findOne({ _id: vehicleId })
        res.status(200).send({
            success: true,
            message: "Vehicle Fetched Successfully",
            vehicle
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting Vehicles",
            error
        })
    }
}
const orderMappingController = async (req, res) => {
    const { vehicleId, orders } = req.body
    try {
        if(!vehicleId){
            return res.status(200).send({
                success:false,
                message:"Vehicle Id is Required"
            })
        }
        if(orders.length<=0){
           return res.status(200).send({
                success:false,
                message:"Orders are required"
            })
        }
        orders.forEach(async (order)=> {
            const updateStatus = await orderModel.findOneAndUpdate({_id:order},{ status:"Shipped"})
        });
        const mappedOrders = await new deliveryMappingModel({ vehicleId, orders }).save()
        res.status(201).send({
            success:true,
            message:"Orders Mapped Successfully",
            mappedOrders
        })
    } catch (error) {
        console.log(error)
        res.status(200).send({
            success: false,
            message: "Error in Mapping Orders",
            error
        })
    }
}


module.exports.createVehicleController = createVehicleController
module.exports.getVehiclesController = getVehiclesController
module.exports.getSingleVehicleController = getSingleVehicleController
module.exports.orderMappingController = orderMappingController