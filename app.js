const express = require("express")
const app = express()
const productRoute = require("./Api/routes/products");
app.use("/products", productRoute)
/*app.use((req, res, next) => {
    res.status(200).json({
        message: "It works"
    })
})*/

module.exports = app;