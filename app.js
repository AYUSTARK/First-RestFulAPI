const express = require("express")
const app = express()
const mor = require("morgan")

app.use(mor("dev"))
//Routes to handle requests
const productsRoute = require("./Api/routes/products");
const ordersRoute = require("./Api/routes/orders");

//Transferring Requests to Respective Routes
app.use("/products", productsRoute)
app.use("/orders", ordersRoute)

app.use((req, res, next) => {
    const error = new Error("Incorrect API Point")
    error.status = 404
    next(error)
    /*res.status(404).json({
        message: "Incorrect API Point"
    })*/
})

app.use((error,req, res, next) => {
    res.status(error.status || 500)
    res.json({
        "error": error.message
    })
})

module.exports = app;