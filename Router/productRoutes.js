const express = require('express')
const { requireSignIn } = require('../middleware/authMiddleware')
const { getPriceController, addProductController, getProductController, deleteSingleProductController, deleteProductsController } = require('../controller/productController')

const productRouter = express.Router()


//api to get the shipping cost of a product
productRouter.post('/get-price', requireSignIn, getPriceController)
//api to add the product to cart 
productRouter.post('/add-product', requireSignIn, addProductController)
// api to get the product from database based on the loggedin user used to load cart 
productRouter.get('/get-products/:userid', requireSignIn, getProductController)
//api to delete single product from the cart
productRouter.delete('/delete-single-product/:pid', requireSignIn, deleteSingleProductController)
//api to delete all products based on user id
productRouter.delete('/delete-products/:userid', requireSignIn, deleteProductsController)


module.exports.productRouter = productRouter