const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        console.log(token)
        const user = jwt.verify(token, process.env.jwtKey)
        res.userAuth = user
        console.log(user, "dfdfs", user.email)
        next()
    } catch (error) {
        return res.status(401).json({
            "status": 401,
            "message": "Auth Failed"
        })
    }
}