const express = require("express")
const router = express.Router()

router.get("",(req, res) => {
    res.status(200).json({
        orders: "Orders mila ya nhii?? Maine to bhej diya🤔"
    })
})

router.post("",(req, res) => {
    res.status(200).json({
        orders: "Order Created"
    })
})

router.get("/:orderId",(req, res) => {
    res.status(200).json({
        get: "Order Details queried",
        id: req.params.orderId
    })
})

router.delete("/:orderId",(req, res) => {
    res.status(200).json({
        get: "Order Deleted",
        id: req.params.orderId
    })
})

module.exports = router