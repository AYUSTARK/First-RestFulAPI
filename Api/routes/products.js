const express = require("express")
const router = express.Router()
const ProductS = require("../models/products")
const mongoose = require("mongoose")
router.get("", (req, res, next) => {
    ProductS.find()
        .exec()
        .then(docs => {
            console.log(docs)
            if (docs.length > 0) {
                res.status(200).json({
                    "status": 200,
                    "data": docs
                })
            } else {
                res.status(404).json({
                    "status": 404,
                    "message": "No entries found"
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({
                "status": 400,
                "message": err
            })
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
        res.status(250).json({
            "status": 250,
            "message": "Handling Post Requests to /products",
            "data": result
        })
    }).catch(err => {
        console.log(err)
        res.status(400).json({
            "status": 400,
            "data": err
        })
    })
})

router.delete("", (req, res, next) => {
    ProductS.deleteMany().exec()
        .then(result => {
            res.status(200).json({
                "status": 200,
                "message": "Deleted " + result.deletedCount,
                "data": result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({
                "status": 400,
                "message": err
            })
        })
})


router.get("/:productId", (req, res, next) => {
    const pId = req.params.productId;
    ProductS.findById(pId).exec().then(doc => {
        if (doc) {
            res.status(200).json({
                "status": 200,
                "message": "Queried",
                "data": doc
            })
        } else {
            res.status(404).json({
                "status": 404,
                "message": "No data for this ID"
            })
        }
    }).catch(err => {
        res.status(400).json({
            "status": 400,
            "message": err
        })
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
    const updateOps = {}
    try {
        for (const ops of req.body) {
            updateOps[ops.key] = ops.value
        }
        // ProductS.updateOne({"_id": pId},{$set: {"name": req.body.name, "phone": req.body.phone}})
        ProductS.updateOne({"_id": pId}, {$set: updateOps}).exec()
            .then(result => {
                console.log(result)
                res.status(200).json({
                    "status": 200,
                    "message": "Patched " + pId + " properly!",
                    "data": result
                })
            })
            .catch(error => {
                console.log(error)
                res.status(300).json({
                    "status": 300,
                    "message": pId + " patch failed",
                    "error": error

                })
            })
    }catch (error){
        res.status(400).json({
            "status": 400,
            "message": error.message
        })
    }

})

router.delete("/:productId", (req, res, next) => {
    const id = req.params.productId
    ProductS.deleteMany({
        _id: id
    }).exec()
        .then(result => {
            res.status(200).json({
                "status": 200,
                "message": "Deleted " + id,
                "data": result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({
                "status": 400,
                "message": err
            })
        })
})


module.exports = router