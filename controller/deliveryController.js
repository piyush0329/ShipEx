const deliveryMappingModel = require("../Models/deliveryMappingModel")
const orderLogModel = require("../Models/orderLogModel")
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
        const vehicles = await vehicleModel.find({});

        const deliveryMapping = await deliveryMappingModel.find()

        const deliveryMappingIds = deliveryMapping.map(mapping => mapping.vehicleId.toString());
        const filteredVehicles = vehicles.filter(vehicle => !deliveryMappingIds.includes(vehicle._id.toString()));

        res.status(200).send({
            success: true,
            message: "Vehicles Fetched Successfully",
            vehicles: filteredVehicles
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in getting Vehicles",
            error
        })
    }
}
const getOrderVehiclesController = async (req, res) => {
    try {
        const vehicles = await vehicleModel.find({});



        res.status(200).send({
            success: true,
            message: "Vehicles Fetched Successfully",
            vehicles: vehicles
        });
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
    const { vehicleId, orders, userid } = req.body
    try {
        if (!vehicleId) {
            return res.status(200).send({
                success: false,
                message: "Vehicle Id is Required"
            })
        }
        if (orders.length <= 0) {
            return res.status(200).send({
                success: false,
                message: "Orders are required"
            })
        }
        orders.forEach(async (order) => {
            const order_details = await orderModel.findOne({ _id: order })
            const updateStatus = await orderModel.findOneAndUpdate({ _id: order }, { status: "Shipped" })
            const orderLog = await new orderLogModel({ orderId: order, order_status: "Shipped", user: userid, location: order_details.startLocation }).save()
        })
        const mappedOrders = await new deliveryMappingModel({ vehicleId, orders }).save()
        res.status(201).send({
            success: true,
            message: "Orders Mapped Successfully",
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
const getVehicleOrderController = async (req, res) => {
    try {
        const { vehicleId } = req.params
        const vehicleOrder = await deliveryMappingModel.findOne({ vehicleId: vehicleId })
        let order_details = []
        if (vehicleOrder) {
            for (let i = 0; i < vehicleOrder.orders.length; i++) {
                const fetchedOrder = await orderModel.findById(vehicleOrder.orders[i]).populate('startLocation', ['officeName']).populate('destinationLocation', ['officeName'])
                order_details.push(fetchedOrder)
            }
        }
        res.status(200).send({
            success: true,
            message: "Orders Fetched Successfully",
            order_details

        })
    } catch (error) {
        console.log(error)
        res.status(200).send({
            success: true,
            message: "Error in Getting Vehicle Orders",
            error
        })

    }

}
const orderLogsController = async (req, res) => {
    try {
        const { location, orders, user } = req.body

        orders.forEach(async (order) => {
            if (order.destinationLocation._id === location) {
                const mappingDelivery = await deliveryMappingModel.findOneAndDelete({ 'orders': order._id })
            }
            const orderLogs = await new orderLogModel({ orderId: order._id, location: location, order_status: order.status, user: user }).save()
        })

        res.status(200).send({
            success: true,
            message: "Log created Successfully",
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in creating logs",
            error
        })

    }
}


module.exports.createVehicleController = createVehicleController
module.exports.getVehiclesController = getVehiclesController
module.exports.getOrderVehiclesController = getOrderVehiclesController
module.exports.getSingleVehicleController = getSingleVehicleController
module.exports.orderMappingController = orderMappingController
module.exports.getVehicleOrderController = getVehicleOrderController
module.exports.orderLogsController = orderLogsController