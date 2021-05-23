const express = require("express")
const router = express.Router()
const userS = require("../models/user")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const salt = 10

router.post("/login", (req, res, next) => {
        userS.findOne({"email": req.body.email}).exec().then(doc => {
                // console.log(doc)
                if (doc) {
                    bcrypt.compare(req.body.password, doc.password, (err, auth) => {
                        // console.log(doc, " ", err, " ", auth)
                        if (err) {
                            console.log(err)
                            res.status(403).json({
                                "status": "403",
                                "message": "Auth Failed"
                            })
                        } else if (auth) {
                            const token = jwt.sign(
                                {"email": req.body.email, "userId": doc._id},
                                process.env.jwtKey,
                                {expiresIn: "1h"})
                            console.log(auth)
                            res.status(200).json({
                                "status": "200",
                                "message": "Logged In",
                                "token": token
                            })
                        } else {
                            console.log(auth)
                            res.status(305).json({
                                "status": "305",
                                "message": "Auth Failed, Incorrect Password"
                            })
                        }
                    })
                } else {
                    console.log(doc)
                    res.status(401).json({
                        "status": "401",
                        "message": "Auth Failed, no user"
                    })
                }
            }
        ).catch(error => {
            console.log(error)
            res.status(400).json({
                "status": "400",
                "message": "User Login Failed",
                "error": error
            })
        })
    }
)

router.post("/signup", (req, res, next) => {
    userS.findOne({"email": req.body.email}).exec().then(doc => {
        if (doc) {
            res.status(350).json({
                "status": 350,
                "message": "User Already Created"
            })
        } else {
            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if (err) {
                    return res.status(409).json({
                        "status": 409,
                        "error": err.message
                    })
                } else if (hash) {
                    const user = new userS({
                        _id: new mongoose.Types.ObjectId(),
                        "name": req.body.name,
                        "email": req.body.email,
                        "password": hash
                    })
                    user.save().then(result => {
                        console.log(result)
                        res.status(200).json({
                            "status": "200",
                            "message": "User Created"
                        })
                    }).catch(error => {
                        console.log(error)
                        res.status(400).json({
                            "status": "400",
                            "message": "User Creation Failed",
                            "error": error
                        })
                    })

                }
            })
        }
    }).catch(error => {
        console.log(error)
        res.status(400).json({
            "status": "400",
            "message": "User Creation Failed",
            "error": error
        })
    })
})

module.exports = router