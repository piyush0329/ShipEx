const express = require('express')
const connectDB = require('./db')
const cors = require('cors')
const { registerController, loginController, updateProfileController, loadUserController, userUpdateController, loadEmployeeController, employeeUpdateController, ControllerAdmin, ControllerEmployee, ControllerUser, createEmployeeController, deleteEmployeeController, deleteUserController } = require('./controller/authController')
const { requireSignIn, isAdmin, isEmployee, isUser } = require('./middleware/authMiddleware')
const { createOfficeController, getOfficeController } = require('./controller/officeController')
const { getPriceController, addProductController, getProductController, deleteSingleProductController, deleteProductsController } = require('./controller/productController')
const { addOrderController, getBuyerOrders, getAllOrdersController, orderStatusController, getEmployeeAllOrdersController, employeeOrderStatusController, getPaginationOrderController, getStatusOrdersController, getExcelSheetController, getInvoiceController, checkoutController, webhookController } = require('./controller/orderController')


const app = express()
connectDB()

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

app.post('/webhook', express.raw({type: 'application/json'}),webhookController);
app.use(express.json())

app.get("/test", (req, res) => {
    res.send("hello world")
})
//register api
app.post("/register", registerController)

//login api
app.post('/login', loginController)

//api to validate user
app.get('/user-auth', requireSignIn, isUser, (req, res) => {
    res.status(200).send({ ok: true })
})

//api to validate signin
app.get('/auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true })
})
//api to validate admin
app.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true })
})

//api to validate employee
app.get('/employee-auth', requireSignIn, isEmployee, (req, res) => {
    res.status(200).send({ ok: true })
})

//api to update user details
app.put('/user', requireSignIn, isUser, ControllerUser)
//api to update employee details
app.put('/employee', requireSignIn, isEmployee, ControllerEmployee)
//api to update admin details
app.put('/admin-details', requireSignIn, isAdmin, ControllerAdmin)

//api to load user details in admin panel
app.get('/load-user/:email', requireSignIn, isAdmin, loadUserController)
//api to update user details in admin panel
app.put('/user-update', requireSignIn, isAdmin, userUpdateController)
//api to delete user in admin panel
app.delete('/delete-user/:email', requireSignIn, isAdmin, deleteUserController)

//api to load employee details in admin panel
app.get('/load-employee/:email', requireSignIn, isAdmin, loadEmployeeController)
//api to update employee details in admin panel
app.put('/employee-update', requireSignIn, isAdmin, employeeUpdateController)
//api to create an employee in admin panel
app.post('/create-employee', requireSignIn, isAdmin, createEmployeeController)
//api to delete an employee from admin panel
app.delete('/delete-employee/:email', requireSignIn, isAdmin, deleteEmployeeController)

//api to create an office from admin panel
app.post('/create-office', requireSignIn, isAdmin, createOfficeController)
//api to get office details 
app.get('/get-office', requireSignIn, getOfficeController)

//api to get shipping price
app.post('/get-price', requireSignIn, getPriceController)

app.post('/add-product', requireSignIn, addProductController)
app.get('/get-products/:userid', requireSignIn, getProductController)
app.delete('/delete-single-product/:pid', requireSignIn, deleteSingleProductController)
app.delete('/delete-products/:userid', requireSignIn, deleteProductsController)

app.post('/add-orders', requireSignIn, addOrderController)
app.get('/get-orders/:buyerid', requireSignIn, getBuyerOrders)
app.get('/all-orders', requireSignIn,isAdmin, getAllOrdersController)
app.get('/employee-all-orders', requireSignIn, isEmployee, getEmployeeAllOrdersController)
app.put('/order-status/:orderId', requireSignIn, isAdmin, orderStatusController)
app.put('/employee-order-status/:orderId', requireSignIn, isEmployee, employeeOrderStatusController)

app.get('/get-order', requireSignIn, isAdmin, getPaginationOrderController)
app.get('/excel-worksheet', requireSignIn, isAdmin, getExcelSheetController)
app.post('/invoice-generate', requireSignIn, getInvoiceController)

app.post('/create-checkout-session',requireSignIn,checkoutController)




app.listen(8000, (req, res) => {
    console.log("server is running")
})
