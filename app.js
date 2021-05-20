const express = require("express")
const app = express()
const productsRoute = require("./Api/routes/products");
const ordersRoute = require("./Api/routes/orders");
app.use("/products", productsRoute)
/*app.use((req, res, next) => {
    res.status(200).json({
        message: "It works"
    })
})*/
app.use("/orders", ordersRoute)

module.exports = app;