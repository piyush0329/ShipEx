const officeModel = require("../Models/officeModel")

const createOfficeController = async (req,res)=>{

    try {
        const { officeId, officeName, state, city, locality, longitude, latitude, pincode, country } = req.body
        if (!officeId) {
            return res.send({ message: "Office Id is required" })
        }
        if (!officeName) {
            return res.send({ message: "Office Name is required" })
        }
        if (!locality) {
            return res.send({ message: "Locality is required" })
        }
        if (!city) {
            return res.send({ message: "City is required" })
        }
        if (!state) {
            return res.send({ message: "State is required" })
        }
        if (!country) {
            return res.send({ message: "Country is required" })
        }
        if (!pincode) {
            return res.send({ message: "Pin Code is required" })
        }
        if (!longitude) {
            return res.send({ message: "Longitude is required" })
        }
        if (!latitude) {
            return res.send({ message: "Latitude is required" })
        }
        const office = await new officeModel({officeId, officeName, state, city, locality, longitude, latitude, pincode, country}).save()
        res.status(200).send({
            success: true,
            message: "Office Created Successfully",
            office
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Creating Office",
            error
        })
    }
}

const getOfficeController =async (req,res)=>{

    try{
        const offices = await officeModel.find({})
        if (offices) {
            res.status(200).send({
                success: true,
                message: "offices fetched sucessfully",
                offices,
            })
        } else {
            res.status(200).send({
                success: false,
                message: "error while getting offices"
            })
        }
    }
    catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: "Unable to load Employee data"
        })
    }
}


module.exports.createOfficeController = createOfficeController
module.exports.getOfficeController = getOfficeController

