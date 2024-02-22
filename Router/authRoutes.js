const express = require('express')
const { registerController, loginController, ControllerUser, ControllerEmployee, ControllerAdmin, loadUserController, userUpdateController, deleteUserController, loadEmployeeController, employeeUpdateController, createEmployeeController, deleteEmployeeController } = require('../controller/authController')
const { requireSignIn, isUser, isAdmin, isEmployee } = require('../middleware/authMiddleware')

const authRouter = express.Router()

//api to register the user
authRouter.post("/register", registerController)

//api to login
authRouter.post('/login', loginController)

//api to validate login person as user
authRouter.get('/user-auth', requireSignIn, isUser, (req, res) => {
    res.status(200).send({ ok: true })
})

//api to validate whether a person is logged in or not
authRouter.get('/auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true })
})
//api to validate login person as admin
authRouter.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true })
})
//api to validate login person as employee
authRouter.get('/employee-auth', requireSignIn, isEmployee, (req, res) => {
    res.status(200).send({ ok: true })
})
//api to update the details of a user in user dashboard
authRouter.put('/user', requireSignIn, isUser, ControllerUser)
//api to update employee details in employee dashboard
authRouter.put('/employee', requireSignIn, isEmployee, ControllerEmployee)
//api to update admin details in admin dashboard
authRouter.put('/admin-details', requireSignIn, isAdmin, ControllerAdmin)

//api to load the user based on provided email
authRouter.get('/load-user/:email', requireSignIn, isAdmin, loadUserController)
//api to update user details in admin panel
authRouter.put('/user-update', requireSignIn, isAdmin, userUpdateController)
//api to delete user in admin panel
authRouter.delete('/delete-user/:email', requireSignIn, isAdmin, deleteUserController)

//api to load employee details in admin panel
authRouter.get('/load-employee/:email', requireSignIn, isAdmin, loadEmployeeController)
//api to update employee details in admin panel
authRouter.put('/employee-update', requireSignIn, isAdmin, employeeUpdateController)
//api to create an employee in admin panel
authRouter.post('/create-employee', requireSignIn, isAdmin, createEmployeeController)
//api to delete an employee from admin panel
authRouter.delete('/delete-employee/:email', requireSignIn, isAdmin, deleteEmployeeController)



module.exports.authRouter = authRouter