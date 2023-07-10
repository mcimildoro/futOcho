const express = require("express");
const userSchema = require("../models/jugadores");
const router = express.Router();

//crear un nuevo usuario

router.post("/AgregarJugadores", (req, res) => {
  const user = new userSchema({
    name: req.body.nombre,
    position: req.body.position,
    nivel: req.body.nivel,
  });

  user
    .save()
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

//listar todos los usuarios

router.get("/ListadoJugadores", (req, res) => {
  userSchema
    .find({}, { id: 0, __v: 0 })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

//buscar un usuario por id

router.post("/ListadoJugadores/:id", (req, res) => {
  const id = req.params.id;
  userSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

//actualizar un usuario por id

router.put("/actualizarJugador/:id", (req, res) => {
  const id = req.params.id;
  const user = {
    name: req.body.nombre,
    position: req.body.position,
    nivel: req.body.nivel,
  };
  userSchema
    .updateOne({ _id: id }, { $set: { user } })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

//eliminar un usuario por id

router.delete("/ListadoJugadores/:id", (req, res) => {
  const id = req.params.id;
  userSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

module.exports = router;
