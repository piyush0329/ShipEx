const officeModel = require("../Models/officeModel")
const orderModel = require("../Models/orderModel")
const paymentModel = require("../Models/paymentModel")
const productModel = require("../Models/productModel")
const stripe = require('stripe')('sk_test_51OZSAbSB0wwAWHZh7j03Dz8PIxm8eqfQGaGHVCbnAhTqwpKLV3YP5FEpA4ttyDFmVun8QeT0J3jwmwX0gqvApwW800srmgFa07')


const getPriceController = async (req, res) => {

    try {
        const { startLocation, destinationLocation, weight, shipmentValue } = req.body
        if (!startLocation) {
            return res.send({ message: "Start Location is required" })
        }
        if (!destinationLocation) {
            return res.send({ message: "Destination Location is required" })
        }
        if (!weight) {
            return res.send({ message: "Weight is required" })
        }
        if (!shipmentValue) {
            return res.send({ message: "Shipment value is required" })
        }
        const startOffice = await officeModel.findOne({ _id: startLocation })
        const destinationOffice = await officeModel.findOne({ _id: destinationLocation })

        let lon1 = startOffice.longitude
        let lat1 = startOffice.latitude
        let lon2 = destinationOffice.longitude
        let lat2 = destinationOffice.latitude

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
        const price = ((distance * 2) + (weight * 15) + ((shipmentValue * 5) / 100))
        res.status(200).send({
            success: true,
            message: "Price calculated successfully",
            price
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Unable to calculate Price"
        })
    }
}

const addProductController = async (req, res) => {
    try {
        const { startLocation, destinationLocation, weight, description, shipmentValue, price, userid } = req.body
        if (!startLocation) {
            return res.send({ message: "Start Location is required" })
        }
        if (!destinationLocation) {
            return res.send({ message: "Destination Location is required" })
        }
        if (!weight) {
            return res.send({ message: "Weight is required" })
        }
        if (!shipmentValue) {
            return res.send({ message: "Shipment value is required" })
        }
        if (!price) {
            return res.send({ message: "Price is required" })
        }
        if (!description) {
            return res.send({ message: "Description is required" })
        }
        if (!userid) {
            return res.send({ message: "User Id is required" })
        }
        const existinguser = await productModel.findOne({ userid: userid })
        if (!existinguser) {
            const product = await new productModel({ startLocation, destinationLocation, weight, description, shipmentValue, price, userid }).save()
            const updatedProduct = await productModel.findById(product._id).populate('startLocation', ["officeName", "officeId"]).populate('destinationLocation', ["officeName", "officeId"])
            res.status(200).send({
                success: true,
                message: "Product Added Successfully",
                updatedProduct,
            })
        } else {
            res.status(200).send({
                success: false,
                message: "Already Product Present",
            })

        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error in Adding Product",
            error
        })

    }

}

const getProductController = async (req, res) => {
    try {

        const { userid } = req.params
        // const session_id= req.query
        // console.log(session_id)
        const products = await productModel.find({ userid }).populate('startLocation', ["officeName", "officeId"]).populate('destinationLocation', ["officeName", "officeId"])
        if (products.length !== 0) {
            if (products[0].payment.sessionId) {
                const session = await stripe.checkout.sessions.retrieve(products[0].payment.sessionId);
                if (session.status === 'complete') {
                    if (session.payment_status === "paid") {
                        const totalPrice = () => {
                            let total = 0;
                            products?.map((item) => (
                                total = total + item.price
                            ))
                            return total
                        }
                        const updateprod = await productModel.findOneAndUpdate({ userid })
                        const order = await new orderModel({ products: products, payment: "Payment Done", buyer: userid, totalAmount: totalPrice() }).save()
                        const payment = await new paymentModel({ order: order._id, buyer: userid, sessionId: session.id, paymentStatus: "Payment Done" }).save()
                        const delproduct = await productModel.deleteMany({ userid: userid })
                        const prod = await productModel.find({ userid })
                        res.status(200).send({
                            success: true,
                            message: "Order Done Successfully",
                            order,
                            payment,
                            session,
                            products: prod
                        })
                    }
                } else {
                    res.status(200).send({
                        success: true,
                        message: "Product fetched successfully",
                        products,
                        session
                    })
                }
            }
            else {
                res.status(200).send({
                    success: true,
                    message: "Product fetched successfully",
                    products,
                })
            }
        }
        else {
            res.status(200).send({
                success: true,
                message: "no product available",
                products
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error in getting Product",
            error
        })
    }
}

const deleteSingleProductController = async (req, res) => {
    try {
        const { pid } = req.params
        const product = await productModel.findByIdAndDelete(pid)
        res.status(200).send({
            success: true,
            message: "Product deleted successfully",
            product
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error in Adding Product",
            error
        })

    }
}

const deleteProductsController = async (req, res) => {
    try {
        const { userid } = req.params
        const products = await productModel.deleteMany({ userid: userid })
        res.status(200).send({
            success: true,
            message: "products deleted successfully",
            products
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "error in Adding Product",
            error
        })
    }
}


module.exports.getPriceController = getPriceController
module.exports.addProductController = addProductController
module.exports.getProductController = getProductController
module.exports.deleteSingleProductController = deleteSingleProductController
module.exports.deleteProductsController = deleteProductsController
