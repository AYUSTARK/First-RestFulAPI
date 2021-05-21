const mongoose = require("mongoose")
const productSchema = mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name: {type: String, required: true},
    phone: {type: Number, required: true}
})

module.exports = mongoose.model("Product",productSchema)