const server = require("./app.js");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/auth")
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((err) => {
    console.error("Error de conexión:", err);
  });
const PORT = 3000;

server.listen(PORT);
console.log("ESCUCHANDO EN EL PUERTO", PORT);
