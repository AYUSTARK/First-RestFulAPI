const express = require("express")
const router = express.Router()
const ProductS = require("../models/products")
const mongoose = require("mongoose")
router.get("", (req, res, next) => {
    res.status(200).json({
        "message": "Handling Get Requests to /products"
    })
})
router.post("", (req, res, next) => {
    const product = new ProductS({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        phone: req.body.phone
    })
    product.save().then(result => {
        console.log(result)
    }).catch(error => {
        console.log(error)
    })
    res.status(250).json({
        "message": "Handling Post Requests to /products",
        "json": product
    })
})

router.get("/:productId", (req, res, next) => {
    const pId = req.params.productId;
    ProductS.findById(pId).exec().then(doc =>{
        res.status(200).json({
            msg: "Queried",
            document: doc
        })
    }).catch(err => {
        const error = new Error(err)
        error.status = 400
        next(error)
    })
/*
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
*/
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