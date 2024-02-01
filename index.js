const express = require('express')
const connectDB = require('./db')
const cors = require('cors')
const { authRouter } = require('./Router/authRoutes')
const { officeRouter } = require('./Router/officeRoutes')
const { productRouter } = require('./Router/productRoutes')
const { orderRouter } = require('./Router/orderRoutes')
const { webhookController } = require('./controller/orderController')
const { deliveryRouter } = require('./Router/deliveryRoutes')

const app = express()
connectDB()

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))

app.post('/webhook', express.raw({ type: 'application/json' }), webhookController);
app.use(express.json())
app.use(authRouter)
app.use(officeRouter)
app.use(productRouter)
app.use(orderRouter)
app.use(deliveryRouter)

app.get("/", (req, res) => {
    res.send("hello world")
})
// app.get("**", (req, res) => {
//     res.send("invalid url")
// })


app.listen(8000, (req, res) => {
    console.log("server is running")
})
