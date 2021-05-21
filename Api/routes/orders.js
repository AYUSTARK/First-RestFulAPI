const express = require("express")
const router = express.Router()

//Handle Simple GET Request
router.get("", (req, res) => {
    res.status(200).json({
        orders: "Orders mila ya nhii?? Maine to bhej diya🤔"
    })
})

//Handle Simple POST Request
router.post("", (req, res, next) => {
    const order = {
        id: req.body.productId,
        quantity: req.body.quantity
    }
    if (req.body.productId) {
        res.status(200).json({
            orders: "Order Created",
            data: order
        })
    }else {
        res.status(300).json({
            "status": 300,
            "message": "Product Id, Not Present"
        })
    }
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