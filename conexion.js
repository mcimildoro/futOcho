const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./.env" }); //ingresar a variables de ambiente customizadas
require("dotenv").config();
const bodyParser = require("body-parser");
const jugadores = require("./rutas/jugadores_rutas");

const app = express();
const port = 5000;

app.use(express.json());
app.use("/api", jugadores);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Configurar server
app.get("/", (req, res) => {
  res.send("Servidor Backend NODE Corriendo");
});

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB is connected to mongo atlas!!!"))
  .catch((err) => console.error(err))
  .catch((err) => console.error(err));
app.listen(port, () => {
  console.log("Server is running on port ", port);
});

//middleware

// const objectBD = mongoose.connection;

// objectBD.on("connected", () => {
//   console.log("Conectado a la base de datos");
// });
// objectBD.on("error", (err) => {
//   console.log("Error al conectar a la base de datos", err);
// });

// module.exports = mongoose;
