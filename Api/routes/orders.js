const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const orderS = require("../models/orders")
//Handle Simple GET Request
router.get("", (req, res) => {
    orderS.find().exec().then(docs => {
        res.status(200).json(docs)
    }).catch(error => {
        res.status(300).json({
            orders: "Orders mila ya nhii?? Maine to bhej diya🤔",
            "message": error.message
        })
    })

})

//Handle Simple POST Request
router.post("", (req, res, next) => {
    const order = new orderS({
        _id: new mongoose.Types.ObjectId(),
        product: req.body.productId,
        quantity: req.body.quantity
    })
    order.save().then(result => {
            console.log(result)
            res.status(200).json(result)
        }
    ).catch(error => {
        res.status(400).json({
            "status": 400,
            "data": error.message
        })
    })
})

//Handle GET Request with "orderId"(attached to URL)
router.get("/:orderId", (req, res) => {
    res.status(200).json({
        get: "Order Details queried",
        id: req.params.orderId
    })
})

//Handle DELETE Request with "orderId"(attached to URL)
router.delete("/:orderId", (req, res) => {
    res.status(200).json({
        get: "Order Deleted",
        id: req.params.orderId
    })
})

module.exports = router