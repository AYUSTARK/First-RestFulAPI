const express = require("express")
const router = express.Router()
router.get("/",((req, res, next) =>{
    res.json({
        "message": "Handling Get Requests to /products"
    })
}))

router.post("/",((req, res, next) =>{
    res.json({
        "message": "Handling Post Requests to /products"
    })
}))