const orderModel = require("../Models/orderModel")
const ExcelJs = require('exceljs')


const addOrderController = async (req, res) => {
    try {
        const { products, buyer } = req.body
        if (!products) {
            return res.send({ message: "Products are required" })
        }
        if (!buyer) {
            return res.send({ message: "Buyer is required" })
        }
        const totalPrice = () => {
            let total = 0;
            products?.map((item) => (
                total = total + item.price
            ))
            return total
        }
        const order = await new orderModel({ products: products, buyer: buyer, totalAmount: totalPrice() }).save()
        res.status(200).send({
            success: true,
            message: "Order Added Successfully",
            order
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Adding Product",
            error
        })
    }
}

const getBuyerOrders = async (req, res) => {
    try {
        const { buyerid } = req.params
        const orders = await orderModel.find({ buyer: buyerid }).populate("buyer", "name").sort({ createdAt: -1 })
        res.json(orders)
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting order",
            error
        })
    }
}
const getAllOrdersController = async (req, res) => {
    try {
        const orders = await orderModel.find({}).populate("buyer", "name").sort({ createdAt: -1 })
        res.json(orders)
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting order",
            error
        })
    }
}


const getPaginationOrderController = async (req, res) => {
    try {
        const { page, limit, status, payment, source, destination } = req.query
        const filters = { }
        if (status) filters.status = status
        if (payment) filters.payment = payment
        if (source) filters["products.startLocation.officeName"] = source
        if (destination) filters["products.destinationLocation.officeName"] = destination
        const orderlength =  (await orderModel.find(filters).populate("buyer", "name").sort({ createdAt: -1 })).length
        const orders =  (await orderModel.find(filters).skip((page - 1) * limit).limit(limit).populate("buyer", "name").sort({ createdAt: -1 }))

        res.status(200).send({
            success:true,
            orderlength,
            orders
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting order",
            error
        })
    }
}

const getExcelSheetController = async (req,res)=>{
    try {
        const { status, payment, source, destination } = req.query
        const filters = { }
        if (status) filters.status = status
        if (payment) filters.payment = payment
        if (source) filters["products.startLocation.officeName"] = source
        if (destination) filters["products.destinationLocation.officeName"] = destination
        const orders =  (await orderModel.find(filters).populate("buyer", "name").sort({ createdAt: -1 }))

        const workbook = new ExcelJs.Workbook()
        const worksheet = workbook.addWorksheet('orders')
        worksheet.columns=[
            {header:'S.no',key:'s_no',width:5},
            {header:'Buyer Name',key:'buyer_name',width:20},
            {header:'Status',key:'status',width:10},
            {header:'Payment',key:'payment',width:15},
            {header:'Total Amount',key:'totalAmount',width:15},
   
        ]
        let count=1
        orders.forEach(order=>{
            order.s_no =count
            order.buyer_name=order.buyer.name
            worksheet.addRow(order)
            count+=1
        })
        worksheet.getRow(1).eachCell((cell)=>{
            cell.font={bold:true}
        })
        const data = await workbook.xlsx.writeFile('order.xlsx')

        res.status(200).send({
            success:true,
            data
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting excel",
            error
        })
    }

}
const getEmployeeAllOrdersController = async (req, res) => {
    try {
        const orders = await orderModel.find({}).populate("buyer", "name").sort({ createdAt: -1 })
        res.json(orders)
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting order",
            error
        })
    }
}

const orderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params
        const { status } = req.body
        const orders = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true })
        res.json(orders)
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while updating order",
            error
        })
    }
}
const employeeOrderStatusController = async (req, res) => {
    try {
        const { orderId } = req.params
        const { status } = req.body
        if (status === "Out for delivery" || status === "Delivered" || status === "Cancelled") {
            const orders = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true })
            res.json(orders)
        } else {
            res.status(200).send({
                success: false,
                message: "Please Provide Valid Status",
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while updating order",
            error
        })
    }
}


module.exports.addOrderController = addOrderController
module.exports.getBuyerOrders = getBuyerOrders
module.exports.getAllOrdersController = getAllOrdersController
module.exports.getPaginationOrderController = getPaginationOrderController
module.exports.getEmployeeAllOrdersController = getEmployeeAllOrdersController
module.exports.orderStatusController = orderStatusController
module.exports.employeeOrderStatusController = employeeOrderStatusController
module.exports.getExcelSheetController = getExcelSheetController

