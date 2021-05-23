const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const orderS = require("../models/orders")
const productS = require("../models/products")
const checkAuth = require("../middleware/check-auth")
const orderController = require("../controllers/orders")
//Handle Simple GET Request
router.get("", checkAuth, orderController.getAll)
//Handle Simple POST Request
router.post("", checkAuth, orderController.createOrder)

//Handle GET Request with "orderId"(attached to URL)
router.get("/:orderId", checkAuth, orderController.getOrder)

//Handle DELETE Request with "orderId"(attached to URL)
router.delete("/:orderId", (req, res) => {
    res.status(200).json({
        get: "Order Deleted",
        id: req.params.orderId
    })
})

module.exports = router