const express = require("express")
const router = express.Router()

router.get("", (req, res, next) => {
    res.status(200).json({
        "message": "Handling Get Requests to /products"
    })
})
router.post("", (req, res, next) => {
    const product = {
        phone: req.body.phone,
        name: req.body.name
    }
    res.status(250).json({
        "message": "Handling Post Requests to /products",
        "json": product
    })
})

router.get("/:productId", (req, res, next) => {
    const pId = req.params.productId;
    if (pId === "special") {
        res.status(200).json({
            msg: "Congrats for getting " + pId
        })
    } else {
        res.status(400).json({
            message: "It's not special...Boooooo",
            id: pId
        })
    }
})

router.patch("/:productId", (req, res, next) => {
    const pId = req.params.productId;
    res.status(200).json({
        msg: "Patched " + pId + " properly!"
    })
})

router.delete("/:productId", (req, res, next) => {
    const pId = req.params.productId;
    res.status(200).json({
        msg: "Deleted " + pId + " properly!"
    })
})



module.exports = router