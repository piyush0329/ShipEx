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
        const vehicles = await vehicleModel.find({ status: "Free" });

        // const deliveryMapping = await deliveryMappingModel.find()
        // const deliveryMappingIds = deliveryMapping.map(mapping => mapping.vehicleId.toString());
        // const filteredVehicles = vehicles.filter(vehicle => !deliveryMappingIds.includes(vehicle._id.toString()));
        res.status(200).send({
            success: true,
            message: "Vehicles Fetched Successfully",
            vehicles
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
        const vehicles = await vehicleModel.find({ status: "Working" });
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
const getAllVehiclesController = async (req,res)=>{
    try {
        const vehicles = await vehicleModel.find({})
        res.status(200).send({
            success:true,
            message:"Vehicles fetched Successfully",
            vehicles
        })
        
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Error in Getting Vehicles",
            error
        })
        
    }
}
const updateVehicleController = async (req,res)=>{
    try {
        const {vehicleNo,capacity,driver,model} = req.body
        if(!vehicleNo){
            return res.status(400).send({
                success:false,
                message:'vehicle number is not available',
            })
        }
        const vehicle = await vehicleModel.findOne({vehicleNo:vehicleNo})

        const updatedVehicle = await vehicleModel.findOneAndUpdate({vehicleNo:vehicleNo},{
            vehicleNo: vehicleNo || vehicle.vehicleNo ,
            capacity:capacity || vehicle.capacity ,
            model: model || vehicle.model ,
            driver: driver || vehicle.driver ,
            status:vehicle.status
        },{new:true})

        res.status(200).send({
            success:true,
            message:"Vehicles Updated Successfully",
            updatedVehicle
        })
        
    } catch (error) {
        res.status(500).send({
            success:false,
            message:"Error in Getting Vehicles",
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
        const order_details = await orderModel.findOne({ _id: orders[0] }).populate('startLocation', ['longitude', 'latitude']).populate('destinationLocation', ['longitude', 'latitude'])
        let lon1 = order_details.startLocation.longitude
        let lat1 = order_details.startLocation.latitude
        let lon2 = order_details.destinationLocation.longitude
        let lat2 = order_details.destinationLocation.latitude

        lon1 = lon1 * Math.PI / 180;
        lon2 = lon2 * Math.PI / 180;
        lat1 = lat1 * Math.PI / 180;
        lat2 = lat2 * Math.PI / 180;
        let dlon = lon2 - lon1;
        let dlat = lat2 - lat1;
        let a = Math.pow(Math.sin(dlat / 2), 2)
            + Math.cos(lat1) * Math.cos(lat2)
            * Math.pow(Math.sin(dlon / 2), 2);
        let c = 2 * Math.asin(Math.sqrt(a));
        let r = 6371;
        const distance = c * r
        const speed = 20
        const time = distance / speed
        const packingTime = 24
        const deliveryTime = 24
        const date = new Date()
        const updatedDate = new Date(date.getTime() + (time + packingTime + deliveryTime) * 3600 * 1000)

        orders.forEach(async (order) => {
            const order_details = await orderModel.findOne({ _id: order })
            const updateStatus = await orderModel.findOneAndUpdate({ _id: order }, { status: "Shipped" })
            const orderLog = await new orderLogModel({ orderId: order, order_status: "Shipped", user: userid, location: order_details.startLocation }).save()

        })
        const mappedOrders = await new deliveryMappingModel({ vehicleId, orders, arrival_time: updatedDate, departure_time: date }).save()
        const vehicle = await vehicleModel.findOneAndUpdate({ _id: vehicleId }, { status: "Working" }, { new: true })
        console.log(vehicle)
        res.status(201).send({
            success: true,
            message: "Orders Mapped Successfully",
            vehicle
            //mappedOrders
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

        if (orders[0].destinationLocation._id === location) {
            const order = await deliveryMappingModel.findOne({ orders: orders[0]._id })
            const vehicle = await vehicleModel.findOneAndUpdate({ _id: order.vehicleId }, {
                status: "Free"
            })
            const mappingDelivery = await deliveryMappingModel.findOneAndDelete({ 'orders': orders[0]._id })
        }
        orders.forEach(async (order) => {   
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
module.exports.getAllVehiclesController =  getAllVehiclesController
module.exports.updateVehicleController =  updateVehicleController
module.exports.orderMappingController = orderMappingController
module.exports.getVehicleOrderController = getVehicleOrderController
module.exports.orderLogsController = orderLogsController