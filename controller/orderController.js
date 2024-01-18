const orderModel = require("../Models/orderModel")
const ExcelJs = require('exceljs')
const fs = require('fs')
const pdf = require('html-pdf')
const moment = require('moment')
const ejs = require('ejs');
const path = require('path');
const stripe = require('stripe')('--add your publishable key--')
const userModel = require("../Models/userModel");
const { stringify } = require("querystring")
const productModel = require("../Models/productModel")





const addOrderController = async (req, res) => {
    try {
        const { products, buyer, payment } = req.body

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
        const order = await new orderModel({ products: products, payment: payment, buyer: buyer, totalAmount: totalPrice() }).save()
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
        const { page, limit } = req.query
        const orders = await orderModel.find({}).skip((page - 1) * limit).limit(limit).populate("buyer", "name").sort({ createdAt: -1 })
        const orderlength = (await orderModel.find({}).populate("buyer", "name").sort({ createdAt: -1 })).length
        res.status(200).send({
            success: true,
            orders,
            orderlength
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

const getPaginationOrderController = async (req, res) => {
    try {
        const { page, limit, status, payment, source, destination } = req.query
        const filters = {}
        if (status) filters.status = status
        if (payment) filters.payment = payment
        if (source) filters["products.startLocation.officeName"] = source
        if (destination) filters["products.destinationLocation.officeName"] = destination
        const orderlength = (await orderModel.find(filters).populate("buyer", "name").sort({ createdAt: -1 })).length
        const orders = (await orderModel.find(filters).skip((page - 1) * limit).limit(limit).populate("buyer", "name").sort({ createdAt: -1 }))

        res.status(200).send({
            success: true,
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

const getExcelSheetController = async (req, res) => {
    try {
        const { status, payment, source, destination } = req.query
        const filters = {}
        if (status) filters.status = status
        if (payment) filters.payment = payment
        if (source) filters["products.startLocation.officeName"] = source
        if (destination) filters["products.destinationLocation.officeName"] = destination
        const orders = (await orderModel.find(filters).populate("buyer", "name").sort({ createdAt: -1 }))

        const workbook = new ExcelJs.Workbook()
        const worksheet = workbook.addWorksheet('orders')
        worksheet.columns = [
            { header: 'S.no', key: 's_no', width: 5 },
            { header: 'Buyer Name', key: 'buyer_name', width: 20 },
            { header: 'Status', key: 'status', width: 10 },
            { header: 'Payment', key: 'payment', width: 15 },
            { header: 'Total Amount', key: 'totalAmount', width: 15 },
        ]
        let count = 1
        orders.forEach(order => {
            order.s_no = count
            order.buyer_name = order.buyer.name
            worksheet.addRow(order)
            count += 1
        })
        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true }
        })
        const data = await workbook.xlsx.writeFile('order.xlsx')

        res.status(200).send({
            success: true,
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
        const { page, limit } = req.query
        const orders = await orderModel.find({}).skip((page - 1) * limit).limit(limit).populate("buyer", "name").sort({ createdAt: -1 })
        const orderlength = (await orderModel.find({}).populate("buyer", "name").sort({ createdAt: -1 })).length
        res.status(200).send({
            success: true,
            orders,
            orderlength
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

const getInvoiceController = async (req, res) => {
    try {
        const { o } = req.body
        const buyer = await userModel.findOne({ _id: o.buyer })
        const invoiceData = {
            invoiceNumber: `${o._id}${moment().format('DDMMYYYY')}`,
            products: o.products,
            order: o,
            buyer: buyer
        }
        const template = await ejs.renderFile('invoice.ejs', { ...invoiceData, moment })
        const pdfOptions = { format: 'Letter' }
        pdf.create(template, pdfOptions).toFile('invoice.pdf', (err, result) => {
            if (err) {
                console.error('Error creating PDF:', err)
                res.status(500).send({
                    success: false,
                    message: 'Error creating PDF',
                    error: err.message,
                });
            } else {
                console.log('PDF created successfully:', result)
                res.sendFile('invoice.pdf', { root: 'C:\\Users\\HSTPL_LAP_008\\Documents\\Learnings\\ShipEx' })
            }
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error while getting invoice",
            error
        })
    }
}

const checkoutController = async (req, res) => {

    try {
        const { products, userId } = req.body
        const user = await userModel.findOne({ _id: userId })
        const lineItems = products.map((product) => (
            {
                price_data: {
                    currency: 'INR',
                    product_data: {
                        name: product.description,
                    },
                    unit_amount: Math.ceil(product.price * 100),
                },
                quantity: 1
            }
        ))
        const customer = await stripe.customers.create({
            name: user.name,
            metadata: {
                userId: userId,
                cart: JSON.stringify(products)

            }
        })
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            customer: customer.id,
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:3000/shipex/services/success',
            cancel_url: 'http://localhost:3000/shipex/services/cancel',

        })

        res.status(200).send({
            url: session.url
        })
        // res.redirect(303, session.url);
    } catch (error) {
        console.log(error)

    }
}


const endpointSecret = "--add your stripe end point sercert key here--";

const webhookController = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let data
    let eventType
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        console.log("webhook verified")
        data = event.data.object
        eventType = event.type
    } catch (err) {
        console.log(`Webhook Error: ${err.message}`)
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event

    if (eventType === "checkout.session.completed") {
        try {
            let payment
            let customerCart
            let customerId
            const customer = await stripe.customers.retrieve(data.customer)
            customerCart = JSON.parse(customer.metadata.cart)
            customerId = customer.metadata.userId

            if (data.payment_status === 'paid') {
                payment = "Payment Done"
            }
            // const totalPrice = () => {
            //     let total = 0;
            //     customerCart?.map((item) => (
            //         total = total + item.price
            //     ))
            //     return total
            // }
            const order = await new orderModel({ products: customerCart, payment: payment, buyer: customerId, totalAmount: (data.amount_total / 100) }).save()
            const products = await productModel.deleteMany({ userid: customerId })
            console.log('Order Done Successfully')
            res.status(200).send({
                success: true,
                message: "Order Done Successfully"
            })
        } catch (error) {
            console.log(error)
        }

    }

    // Return a 200 res to acknowledge receipt of the event
    res.send().end()
}



module.exports.addOrderController = addOrderController
module.exports.getBuyerOrders = getBuyerOrders
module.exports.getAllOrdersController = getAllOrdersController
module.exports.getPaginationOrderController = getPaginationOrderController
module.exports.getEmployeeAllOrdersController = getEmployeeAllOrdersController
module.exports.orderStatusController = orderStatusController
module.exports.employeeOrderStatusController = employeeOrderStatusController
module.exports.getExcelSheetController = getExcelSheetController
module.exports.getInvoiceController = getInvoiceController
module.exports.checkoutController = checkoutController
module.exports.webhookController = webhookController

