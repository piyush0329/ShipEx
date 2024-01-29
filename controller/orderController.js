const orderModel = require("../Models/orderModel")
const ExcelJs = require('exceljs')
const pdf = require('html-pdf')
const moment = require('moment')
const ejs = require('ejs');
const path = require('path');
const stripe = require('stripe')('sk_test_51OZSAbSB0wwAWHZh7j03Dz8PIxm8eqfQGaGHVCbnAhTqwpKLV3YP5FEpA4ttyDFmVun8QeT0J3jwmwX0gqvApwW800srmgFa07')
const userModel = require("../Models/userModel");
const paymentModel = require("../Models/paymentModel")
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
        const orders = await orderModel.find({ buyer: buyerid }).populate('startLocation', ['officeName']).populate('destinationLocation', ['officeName']).populate("buyer", "name").sort({ createdAt: -1 })
        orders.forEach(async (order) => {
            if (order.refundDetails !== null) {
                const refund = await stripe.refunds.retrieve(order.refundDetails.refundId)
                if (refund.destination_details.card.reference != "pending") {
                    const updateorder = await orderModel.findOneAndUpdate({ _id: order._id }, {
                        refundDetails: {
                            destination_details: {
                                card: {
                                    reference: refund.destination_details.card.reference,
                                    reference_status: refund.destination_details.card.reference_status,
                                    reference_type: refund.destination_details.card.reference_type,
                                    type: refund.destination_details.card.type
                                },
                                type: "card"
                            },
                            refundId: refund.id,
                        }
                    })
                }
            }
        })
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
        const orders = await orderModel.find({}).skip((page - 1) * limit).limit(limit).populate('startLocation', ['officeName']).populate('destinationLocation', ['officeName']).populate("buyer", "name").sort({ createdAt: -1 })
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
        const orders = (await orderModel.find(filters).skip((page - 1) * limit).limit(limit).populate('startLocation', ['officeName']).populate('destinationLocation', ['officeName']).populate("buyer", "name").sort({ createdAt: -1 }))

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
        const orders = await orderModel.find({}).skip((page - 1) * limit).limit(limit).populate('startLocation', ['officeName']).populate('destinationLocation', ['officeName']).populate("buyer", "name").sort({ createdAt: -1 })
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
    let sessionId
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
            // metadata: {
            //     userId: userId,
            //     cart: JSON.stringify(products)
            // }
        })
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            customer: customer.id,
            line_items: lineItems,
            phone_number_collection: {
                enabled: true
            },
            metadata: {
                userId: userId,
            },
            mode: 'payment',
            success_url: `http://localhost:3000/cart?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://localhost:3000/cart?session_id={CHECKOUT_SESSION_ID}`,
        })
        products.forEach(async (element) => {
            if (element.payment.sessionId !== null) {
                const session = await stripe.checkout.sessions.retrieve(element.payment.sessionId)
                if (session.status === "open") {
                    sessionId = element.payment.sessionId
                    const checkout_url = `https://checkout.stripe.com/c/pay/${sessionId}#fidkdWxOYHwnPyd1blpxYHZxWjA0Sl9WRGdWRzVyckRSTV9tbk5PMWpWTVdgTnRodkBSVkJxPV9HfWRcd3VzTGRibk98X2pnSzRgSGpOR2hkTTRBfTFddUJLbU5QdXBvMkFTYENxVm01THV%2FNTVfd2puQG5wTScpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPyd2bGtiaWBabHFgaCcpJ2BrZGdpYFVpZGZgbWppYWB3dic%2FcXdwYHgl`
                    return res.status(200).send({
                        success: true,
                        message: "url and session id",
                        url: checkout_url,
                        sessId: sessionId
                    })

                }
            } else {
                const product = await productModel.findOneAndUpdate({ userid: userId }, {
                    payment: {
                        sessionId: session.id,
                    }
                }, { new: true })
                return res.status(200).send({
                    success: true,
                    message: "url and session id",
                    url: session.url,
                    sessionId: session.id,
                    product
                })
            }
        });
        // return res.status(200).send({
        //     success:true,
        //     message:"url and session id",
        //     url: session.url,
        //     sessionId: session.id 
        // })
        // res.redirect(303, session.url);
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error in checkout controller",
            error
        })
    }
}
const webhookController = async (req, res) => {
    const endpointSecret = "whsec_aa8c457099f5a8c2dfbc0f443c43702bcae032b40da6fd3872a2b5df10a2861c"
    const sig = req.headers['stripe-signature']
    let data
    let eventType
    let event
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret)
        console.log("webhook verified")
        data = event.data.object
        eventType = event.type
    } catch (err) {
        console.log(`Webhook Error: ${err.message}`)
        res.status(400).send(`Webhook Error: ${err.message}`)
        return
    }
    // Handle the event

    // if (eventType === "checkout.session.completed") {
    //     try {
    //         let payment
    //         let customerCart
    //         let customerId
    //         const customer = await stripe.customers.retrieve(data.customer)
    //         customerCart = JSON.parse(customer.metadata.cart)
    //         customerId = customer.metadata.userId
    //         console.log(data)

    //         if (data.payment_status === 'paid') {
    //             payment = "Payment Done"
    //             const order = await new orderModel({ products: customerCart, payment: payment, buyer: customerId, totalAmount: (data.amount_total / 100) }).save()
    //             const products = await productModel.deleteMany({ userid: customerId })
    //             console.log('Order Done Successfully')
    //             res.status(200).send({
    //                 success: true,
    //                 message: "Order Done Successfully"
    //             })
    //         }       
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    // Return a 200 res to acknowledge receipt of the event
    res.send().end()
}
const refundController = async (req, res) => {
    try {
        const { order } = req.body
        const payment = await paymentModel.findOne({ order: order._id })
        const session = await stripe.checkout.sessions.retrieve(payment.sessionId)
        const refund = await stripe.refunds.create({
            payment_intent: session.payment_intent,
            amount: parseInt(order.totalAmount * 100),
        });
        const updatePayment = await paymentModel.findOneAndUpdate({ order: order._id }, {
            refundId: refund.id,
            paymentStatus: "Refunded"
        })
        const refundDetails = await stripe.refunds.retrieve(refund.id)
        const updateOrder = await orderModel.findOneAndUpdate({ _id: order._id }, {
            payment: "Refunded",
            refundDetails: {
                destination_details: refundDetails.destination_details,
                refundId: refund.id
            }

        })
        res.status(200).send({
            success: true,
            message: "Refund initiated sucessfully",
            refundId: refund.id
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error while creating refund",
            error
        })

    }

}

const orderStatsController = async (req, res) => {

    try {
        const orderStats = await orderModel.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" },
                        day: { $dayOfMonth: "$createdAt" }
                    },
                    totalOrders: { $sum: 1 },
                    totalAmount: { $sum: "$totalAmount" }
                }
            },
            {
                $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1, "_id.paymentStatus": 1 }
            }
        ])
        const orderPaymentBased = await orderModel.aggregate([
            {
              $group: {
                _id: "$payment",  // Group by payment status
                count: { $sum: 1 }       // Count the number of orders for each payment status
              }
            }
          ])
        const orderStatusBased = await orderModel.aggregate([
            {
              $group: {
                _id: "$status",  // Group by status
                count: { $sum: 1 }       // Count the number of orders for each status
              }
            }
          ])
        res.status(200).send({
            success: true,
            message: 'OrderStats Fetch Successfully',
            orderStats,
            orderPaymentBased,
            orderStatusBased
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "error while getting order stats",
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
module.exports.getInvoiceController = getInvoiceController
module.exports.checkoutController = checkoutController
module.exports.webhookController = webhookController
module.exports.refundController = refundController
module.exports.orderStatsController = orderStatsController


