const http = require("http")
const app = require("./app")

//Incoming Request Port
const port = process.env.PORT || 3000;

const server = http.createServer(app);

//Server Listener
server.listen(port);

