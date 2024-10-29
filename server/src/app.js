const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { createRoles } = require("./libs/initialsetup");
const productRoutes = require("./routes/products.routes");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const morgan = require("morgan");

const server = express();
server.name = "AUTH";
createRoles();

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use(express.json());

server.use("/", productRoutes);
server.use("/", authRoutes);
server.use("/", userRoutes);

module.exports = server;
