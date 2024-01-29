const express = require('express')
const { requireSignIn, isAdmin, isEmployee } = require('../middleware/authMiddleware')
const { addOrderController, getBuyerOrders, getAllOrdersController, getEmployeeAllOrdersController, orderStatusController, employeeOrderStatusController, getPaginationOrderController, getExcelSheetController, getInvoiceController, checkoutController,orderStatsController, refundController } = require('../controller/orderController')
const orderRouter = express.Router()
const stripe = require('stripe')('sk_test_51OZSAbSB0wwAWHZh7j03Dz8PIxm8eqfQGaGHVCbnAhTqwpKLV3YP5FEpA4ttyDFmVun8QeT0J3jwmwX0gqvApwW800srmgFa07')


//api is used to add the orders to order model
orderRouter.post('/add-orders', requireSignIn, addOrderController)
//api is used to get the orders of a particular user
orderRouter.get('/get-orders/:buyerid', requireSignIn, getBuyerOrders)
//api to get all orders for admin
orderRouter.get('/all-orders', requireSignIn, isAdmin, getAllOrdersController)
//api to get all orders for employee
orderRouter.get('/employee-all-orders', requireSignIn, isEmployee, getEmployeeAllOrdersController)
//api to change the order status in admin panel
orderRouter.put('/order-status/:orderId', requireSignIn, isAdmin, orderStatusController)
//api to change the order status in employee panel
orderRouter.put('/employee-order-status/:orderId', requireSignIn, isEmployee, employeeOrderStatusController)
//api to get orders in pagintion and based on filter condition
orderRouter.get('/get-order', requireSignIn, isAdmin, getPaginationOrderController)
//api to generate excel sheet of order details
orderRouter.get('/excel-worksheet', requireSignIn, isAdmin, getExcelSheetController)
//api to generate the invoice of the delivered order
orderRouter.post('/invoice-generate', requireSignIn, getInvoiceController)
//api to create a checkout page to make payment
orderRouter.post('/create-checkout-session', requireSignIn, checkoutController)
//api to  create the refund for the cancelled order
orderRouter.post('/refund', requireSignIn, refundController)

orderRouter.get('/order-statistics', requireSignIn,isAdmin, orderStatsController)


orderRouter.get('/get-refund-status/:id', async (req, res) => {
    const { id } = req.params
    try {
        const refund = await stripe.refunds.retrieve(id);
        console.log(refund)
    } catch (error) {
        console.log(error)
    }

})




module.exports.orderRouter = orderRouter