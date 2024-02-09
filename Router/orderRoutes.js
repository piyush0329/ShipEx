const express = require('express')
require('dotenv').config()
const { requireSignIn, isAdmin, isEmployee, cacheMiddleware } = require('../middleware/authMiddleware')
const { addOrderController, getBuyerOrders, getAllOrdersController, getEmployeeAllOrdersController, orderStatusController, employeeOrderStatusController, getPaginationOrderController, getExcelSheetController, getInvoiceController, checkoutController,orderStatsController, refundController, getDeliveryOrdersController } = require('../controller/orderController')
const orderRouter = express.Router()
const stripe = require('stripe')('process.env.STRIPE_SECRET_KEY')


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
//api to get the order statistics in the admin panel 
orderRouter.get('/order-statistics', requireSignIn,isAdmin, orderStatsController)
orderRouter.get('/delivery-orders', requireSignIn,isAdmin,getDeliveryOrdersController)


module.exports.orderRouter = orderRouter