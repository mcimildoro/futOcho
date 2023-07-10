// const express = require("express");
// const app = express();
// const port = 5000;
// require("dotenv").config(); //ingresar a variables de ambiente customizadas

// app.listen(port, () => {
//   console.log("Server is running on port ", port);
// });

// //Configurar server
// app.get("/", (req, res) => {
//   res.send("Servidor Backend NODE Corriendoooo");
// });



// //importar conexion mongodb
// const archivoBD = require("./conexion");
// //importar connection mongoose
// const mongoose = require("./conexion");

// //importar del archivo rutas y modelo de jugadores
// const rutasJugadores = require("./rutas/jugadores");
// app.use("/api/jugadores", rutasJugadores);

// //importar body-parser, middeware para analizar el cuerpo de las solicitudes entrantes en un middleware antes de sus manejadores, disponible bajo la propiedad req.body.
// const bodyParser = require("body-parser");
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// //activamos cors para que el frontend pueda acceder al backend
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials, X-Auth-Token"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header("Allow", "GET, POST, PUT, DELETE, OPTIONS");
//   next();
// });
