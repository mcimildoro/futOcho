//CREAMOS SCHEMA PARA JUGADORES Y EXPORTAMOS EL MODELO

const mongoose = require("mongoose");

const schema = mongoose.Schema;
const JugadorSchema = new schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  nivel: { type: String, required: true },
});

module.exports = mongoose.model("Jugador", JugadorSchema);
