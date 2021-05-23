const orderS = require("../models/orders")
const productS = require("../models/products")
const mongoose = require("mongoose")


exports.getAll = (req, res) => {
    orderS.find().exec().then(docs => {
        res.status(200).json(docs)
    }).catch(error => {
        res.status(300).json({
            orders: "Orders mila ya nhii?? Maine to bhej diya🤔",
            "message": error.message
        })
    })
}

exports.createOrder = (req, res, next) => {
    productS.findById(req.body.productId).exec()
        .then(product => {
            if (product) {
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
            } else {
                res.status(400).json({
                    "status": 400,
                    "message": "Id Not Found",
                })
            }
        }).catch(err => {
        res.status(400).json({
            "status": 400,
            "message": "Id Not Found",
            "data": err
        })
    })
}

exports.getOrder = (req, res) => {
    orderS.findById(req.params.orderId)
        .populate("product")
        .exec()
        .then(order => {
            if (order) {
                res.status(200).json({
                    "status": 200,
                    "message": "Order queried",
                    "data": order
                })
            } else {
                res.status(404).json({
                    "status": 404,
                    "message": "Order not found",
                    id: req.params.orderId
                })
            }
        })
        .catch(error => {
            res.status(404).json({
                "status": 404,
                "message": "Order Not Found",
                "error": error.message
            })
        })

}