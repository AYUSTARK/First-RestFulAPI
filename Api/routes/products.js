const express = require("express")
const router = express.Router()
router.get("",(req, res, next) =>{
    res.status(200).json({
        "message": "Handling Get Requests to /products"
    })
})

router.post("",(req, res, next) =>{
    res.status(250).json({
        "message": "Handling Post Requests to /products"
    })
})

router.get("/:productId",(req, res, next) => {
    const pId = req.params.productId;
    if (pId === "special"){
        res.status(200).json({
            msg: "Congrats for getting "+pId
        })
    }else {
        res.status(400).json({
            message: "It's not special...Boooooo",
            id: pId
        })
    }
})

module.exports = router