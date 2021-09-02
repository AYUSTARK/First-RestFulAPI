const express = require("express")
const app = express()
const mor = require("morgan")
const bParser = require("body-parser")
const mongoose = require("mongoose")
const mySql = require("mysql")

//Routes to handle requests
const productsRoute = require("./Api/routes/products");
const ordersRoute = require("./Api/routes/orders");
const userRoute = require("./Api/routes/user");
const pass = "apistorm"

/*const con = mySql.createConnection({
    host: "162.214.80.64",
    user: "nishanat_api",
    password: "jayant@1986",
    database: "nishanat_users"
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});
const sql = "Create table user(name Varchar(25));"
con.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Result: " + result);
})*/

mongoose.connect("mongodb+srv://Storm:" + process.env.mongoPass + "@mongo.yjmso.mongodb.net/firstDB?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then( r =>{
    console.log("Mongoose Connected", r)
    }
).catch(error => {
    console.error("Mongoose Error: " + error)
})

app.use(mor("dev"))
app.use(bParser.urlencoded({extended: false}))
app.use(bParser.json())

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization")
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, PATCH, DELETE, POST, GET")
        return res.status(200).json({})
    }
    next()
})

//Transferring Requests to Respective Routes
app.use("/api/products", productsRoute)
app.use("/api/orders", ordersRoute)
app.use("/api/user", userRoute)


app.use((req, res, next) => {
    const error = new Error("Incorrect API Point")
    error.status = 404
    next(error)
    /*res.status(404).json({
        message: "Incorrect API Point"
    })*/
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        "error": error.message
    })
})

module.exports = app;