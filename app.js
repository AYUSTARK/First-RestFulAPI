const express = require("express")
const app = express()
const mor = require("morgan")
const bParser = require("body-parser")
const mongoose = require("mongoose")



//Routes to handle requests
const productsRoute = require("./Api/routes/products");
const ordersRoute = require("./Api/routes/orders");

app.use(mor("dev"))
app.use(bParser.urlencoded({extended:false}))
app.use(bParser.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers","Content-Type, Authorization")
    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods","PUT, PATCH, DELETE, POST, GET")
        return res.status(200).json({})
    }
    next()
})

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