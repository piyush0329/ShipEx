const employeeModel = require("../Models/employeeModel")
const userModel = require("../Models/userModel")
const { hashPassword, comparePassword } = require("../helpers/authHelper")
const JWT = require('jsonwebtoken')



const registerController = async (req, res) => {

    try {
        const { name, roll, classname, email, password, phone, gender, dob } = req.body
        if (!name) {
            return res.send({ message: "Name is required" })
        }
        if (!roll) {
            return res.send({ message: "Roll Number is required" })
        }
        if (!classname) {
            return res.send({ message: "Class is required" })
        }
        if (!email) {
            return res.send({ message: "Email is required" })
        }
        if (!password) {
            return res.send({ message: "Password is required" })
        }
        if (!phone) {
            return res.send({ message: "Phone is required" })
        }
        if (!gender) {
            return res.send({ message: "Gender is required" })
        }
        if (!dob) {
            return res.send({ message: "Date of Birth is required" })
        }

        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            res.status(200).send({
                success: false,
                message: "User Already registered"

            })
        }
        const hashedPassword = await hashPassword(password)
        const user = await new userModel({ name, roll, classname, email, password: hashedPassword, phone, dob, gender }).save()
        res.status(200).send({
            success: true,
            message: "User Registered Successfully",
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error in registration",
            error
        })

    }
}
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid Email or Password"
            })
        }
        const user = await userModel.findOne({ email }).populate('employeeDetails')
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not registered"
            })
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(401).send({
                success: false,
                message: "Invalid Password"
            })
        }
        const token = await JWT.sign({ _id: user._id }, "ANISIFHFSFSOFSFO", {
            expiresIn: '10d',
        })
        if (user.employeeDetails !== null) {
            res.status(200).send({
                success: true,
                message: "Loggedin Successfully",
                user: {
                    _id: user._id,
                    name: user.name,
                    roll: user.roll,
                    classname: user.classname,
                    email: user.email,
                    role: user.role,
                    phone: user.phone,
                    gender: user.gender,
                    dob: user.dob,
                },
                employee: {
                    _id: user.employeeDetails._id,
                    aadharNumber: user.employeeDetails.aadharNumber,
                    dlNumber: user.employeeDetails.dlNumber,
                    address: user.employeeDetails.address
                },
                token
            })

        } else {

            res.status(200).send({
                success: true,
                message: "Loggedin Successfully",
                user: {
                    _id: user._id,
                    name: user.name,
                    roll: user.roll,
                    classname: user.classname,
                    email: user.email,
                    role: user.role,
                    phone: user.phone,
                    gender: user.gender,
                    dob: user.dob,
                },
                token
            })


        }

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error
        })
    }
}
const updateProfileController = async (req, res) => {
    try {
        const { name, roll, classname, password, gender, phone, dob } = req.body
        const user = await userModel.findById(req.user._id)
        if (!password || password.length < 6) {
            return res.json({ error: "Password is required and 6 character long" })
        }
        const hashedPassword = password ? await hashPassword(password) : undefined
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            roll: roll || user.roll,
            password: hashedPassword || user.password,
            phone: phone || user.phone,
            classname: classname || user.classname,
            gender: gender || user.gender,
            dob: dob || user.dob,
        }, { new: true })

        res.status(200).send({
            success: true,
            message: "Profile Updated Sucessfully",
            updatedUser
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error while updating profile",
            error
        })
    }
}
const loadUserController = async (req, res) => {
    try {
        const { email } = req.params
        const data = await userModel.findOne({ email, role: 0 })
        if (data) {
            res.status(200).send({
                success: true,
                message: "user data fetched sucessfully",
                data
            })
        } else {
            res.status(200).send({
                success: false,
                message: "error while getting data"
            })

        }

    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Unable to load User data"
        })
    }
}
const userUpdateController = async (req, res) => {
    try {
        const { email, name, roll, classname, password, role, gender, phone, dob } = req.body
        const user = await userModel.findOne({ email })
        if (!password || password.length < 6) {
            return res.json({ error: "Password is required and 6 character long" })
        }
        const hashedPassword = password ? await hashPassword(password) : undefined
        const updatedUser = await userModel.findOneAndUpdate({ email: email }, {

            name: name || user.name,
            roll: roll || user.roll,
            password: hashedPassword || user.password,
            classname: classname || user.classname,
            role: role || user.role,
            gender: gender || user.gender,
            phone: phone || user.phone,
            dob: dob || user.dob,
        }, { new: true })

        res.status(200).send({
            success: true,
            message: "User Profile Updated Sucessfully",
            updatedUser
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error while updating profile",
            error
        })
    }

}
const loadEmployeeController = async (req, res) => {
    try {
        const { email } = req.params
        const data = await userModel.findOne({ email, role: 2 }).populate('employeeDetails');
        if (data) {
            res.status(200).send({
                success: true,
                message: "Employee data fetched sucessfully",
                data,

            })
        } else {
            res.status(200).send({
                success: false,
                message: "error while getting data"
            })

        }

    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Unable to load Employee data"
        })
    }
}
const employeeUpdateController = async (req, res) => {

    try {

        const { email, name, roll, classname, role, password, gender, phone, dob, aadharNumber, dlNumber, address } = req.body
        const user = await userModel.findOne({ email })
        if (!password || password.length < 6) {
            return res.json({ error: "Password is required and 6 character long" })
        }
        const hashedPassword = password ? await hashPassword(password) : undefined
        const updatedUser = await userModel.findOneAndUpdate({ email: email }, {
            name: name || user.name,
            roll: roll || user.roll,
            password: hashedPassword || user.password,
            classname: classname || user.classname,
            role: role || user.role,
            gender: gender || user.gender,
            phone: phone || user.phone,
            dob: dob || user.dob,
        }, { new: true })

        const employee = await employeeModel.findOne({ _id: user.employeeDetails })

        const updatedEmployee = await employeeModel.findByIdAndUpdate({ _id: user.employeeDetails }, {
            aadharNumber: aadharNumber || employee.aadharNumber,
            dlNumber: dlNumber || employee.dlNumber,
            address: address || employee.address,

        }, { new: true })

        res.status(200).send({
            success: true,
            message: "Employee Profile Updated Sucessfully",
            updatedUser,
            updatedEmployee
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error while updating Employee profile",
            error
        })
    }
}
const ControllerUser = async (req, res) => {
    try {
        const { name, roll, classname, password, phone, gender, dob } = req.body
        const user = await userModel.findById(req.user._id)
        if (!password || password.length < 6) {
            return res.json({ error: "Password is required and 6 character long" })
        }
        const hashedPassword = password ? await hashPassword(password) : undefined
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            roll: roll || user.roll,
            password: hashedPassword || user.password,
            classname: classname || user.classname,
            phone: phone || user.phone,
            gender: gender || user.gender,
            dob: dob || user.dob,
        }, { new: true })
        res.status(200).send({
            success: true,
            message: "Profile Updated Sucessfully",
            updatedUser
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error while updating profile",
            error
        })
    }
}
const ControllerAdmin = async (req, res) => {
    try {
        const { name, roll, classname, password, phone, gender, dob, aadharNumber, dlNumber, address } = req.body
        const user = await userModel.findById(req.user._id)
        if (!password || password.length < 6) {
            return res.json({ error: "Password is required and 6 character long" })
        }
        const hashedPassword = password ? await hashPassword(password) : undefined
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            roll: roll || user.roll,
            password: hashedPassword || user.password,
            classname: classname || user.classname,
            gender: gender || user.gender,
            phone: phone || user.phone,
            dob: dob || user.dob,
        }, { new: true })

        const employee = await employeeModel.findById({ _id: user.employeeDetails })
        const updatedEmployee = await employeeModel.findByIdAndUpdate(employee._id, {
            aadharNumber: aadharNumber || user.aadharNumber,
            dlNumber: dlNumber || user.dlNumber,
            address: address || user.address,
        }, { new: true })


        res.status(200).send({
            success: true,
            message: "Profile Updated Sucessfully",
            updatedUser,
            updatedEmployee
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error while updating profile",
            error
        })
    }

}
const ControllerEmployee = async (req, res) => {
    try {
        const { name, roll, classname, email, password, dob, phone, gender, aadharNumber, dlNumber, address } = req.body
        const user = await userModel.findById(req.user._id)
        if (!password || password.length < 6) {
            return res.json({ error: "Password is required and 6 character long" })
        }
        const hashedPassword = password ? await hashPassword(password) : undefined
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            roll: roll || user.roll,
            password: hashedPassword || user.password,
            classname: classname || user.classname,
            phone: phone || user.phone,
            gender: gender || user.gender,
            dob: dob || user.dob,
        }, { new: true })
        const employee = await employeeModel.findById({ _id: user.employeeDetails })

        const updatedEmployee = await employeeModel.findByIdAndUpdate(employee._id, {
            aadharNumber: aadharNumber || user.aadharNumber,
            dlNumber: dlNumber || user.dlNumber,
            address: address || user.address,
        }, { new: true })
        res.status(200).send({
            success: true,
            message: "Profile Updated Sucessfully",
            updatedUser,
            updatedEmployee
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error while updating profile",
            error
        })
    }

}
const createEmployeeController = async (req, res) => {
    try {
        const { name, roll, classname, email, role, password, gender, phone, dob, aadharNumber, dlNumber, address } = req.body
        if (!name) {
            return res.send({ message: "Name is required" })
        }
        if (!roll) {
            return res.send({ message: "Roll Number is required" })
        }
        if (!classname) {
            return res.send({ message: "Class is required" })
        }
        if (!email) {
            return res.send({ message: "Email is required" })
        }
        if (!password) {
            return res.send({ message: "Password is required" })
        }
        if (!phone) {
            return res.send({ message: "Phone is required" })
        }
        if (!gender) {
            return res.send({ message: "Gender is required" })
        }
        if (!dob) {
            return res.send({ message: "Date of Birth is required" })
        }
        if (!aadharNumber) {
            return res.send({ message: "Aadhar Number is required" })
        }
        if (!dlNumber) {
            return res.send({ message: "Driving Licence is required" })
        }
        if (!address) {
            return res.send({ message: "Address is required" })
        }
        if (!role) {
            return res.send({ message: "Role is required" })
        }

        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "Already registered"
            })
        }
        const hashedPassword = await hashPassword(password)
        const employee = await new employeeModel({ aadharNumber, dlNumber, address }).save()
        const user = await new userModel({ name, roll, classname, email, password: hashedPassword, role, gender, phone, dob, employeeDetails: employee._id }).save()
        res.status(200).send({
            success: true,
            message: "Employee Created Successfully",
            user,
            employee,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Creating Employee",
            error
        })
    }
}
const deleteEmployeeController = async (req, res) => {

    try {
        const { email } = req.params
        const user = await userModel.findOne({ email })
        if (user) {
            if (user.role === 2) {
                const deletedEmployee = await employeeModel.findOneAndDelete({ _id: user.employeeDetails })
                const deletedUser = await userModel.findOneAndDelete({ email })

                res.status(200).send({
                    success: true,
                    message: "employee deleted successfully",
                    deletedUser,
                    deletedEmployee
                })
            }
            else {
                return res.status(200).send(
                    {
                        success: false,
                        message: "employee doesn't exist or email doesn't belong to valid employee"
                    }
                )
            }
        } else {
            return res.status(200).send(
                {
                    success: false,
                    message: "employee doesn't exist or email doesn't belong to valid employee"
                }
            )
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error while deleting employee",
            error
        })
    }
}
const deleteUserController = async (req, res) => {
    const { email } = req.params
    try {
        const user = await userModel.findOne({ email })
        if (user) {
            if (user.role === 0) {
                const data = await userModel.findOneAndDelete({ email })
                res.status(200).send({
                    success: true,
                    message: "User deleted successfully",
                    data
                })
            }
            else {
                return res.status(200).send(
                    {
                        success: false,
                        message: "user doesn't exist or email doesn't belong to valid user"
                    }
                )
            }
        } else {
            return res.status(200).send(
                {
                    success: false,
                    message: "user doesn't exist or email doesn't belong to valid user"
                }
            )
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Error while deleting user",
            error
        })
    }
}


module.exports.registerController = registerController
module.exports.loginController = loginController
module.exports.updateProfileController = updateProfileController
module.exports.loadUserController = loadUserController
module.exports.userUpdateController = userUpdateController
module.exports.loadEmployeeController = loadEmployeeController
module.exports.employeeUpdateController = employeeUpdateController
module.exports.ControllerUser = ControllerUser
module.exports.ControllerAdmin = ControllerAdmin
module.exports.ControllerEmployee = ControllerEmployee
module.exports.createEmployeeController = createEmployeeController
module.exports.deleteEmployeeController = deleteEmployeeController
module.exports.deleteUserController = deleteUserController
