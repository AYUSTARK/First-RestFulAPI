const mongoose = require("mongoose")
const productSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: String,
    phone: Number
})

module.exports = mongoose.model("Product",productSchema)