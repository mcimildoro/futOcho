import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "./AgregarJugador.scss";
import ListaJugadores from "../ListaJugadores/ListaJugadores";
import uniquid from "uniqid";
import { useNavigate } from "react-router-dom";

function AgregarJugadores() {
  //hooks
  const [nombre, setNombre] = useState("");
  const [position, setPosition] = useState("");
  const [nivel, setNivel] = useState("");
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();

  //mapeo de todos los jugadores en all_players.json con axios

  const getData = async () => {
    try {
      //extrae los datos de la base de datos mongodb
      const response = await axios.get("./all_jugadores.json");
      setPlayers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(players);

  //agregar jugador por post con axios

  const agregarJugador = () => {
    const jugador = {
      nombre: nombre,
      position: position,
      nivel: nivel,
      id: uniquid(),
    };

    axios
      .post("/api/AgregarJugadores", jugador)
      .then((res) => {
        console.log("jugador agregado!");
        navigate(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleSubmit(e) {
    e.preventDefault();
    agregarJugador();
  }

  return (
    <>
      // muestra todos los jugadores del mapeo de all_players.json
      {/* <div className="container">
        <div className="row">
          <div className="col-12 mt-4">
            <h1>Crear jugadores</h1>
          </div>
        </div>
        <div className="row">
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a className="dropdown-item" href="#">
              Action
            </a>
            <a className="dropdown-item" href="#">
              Another action
            </a>
            <a className="dropdown-item" href="#">
              Something else here
            </a>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="col-sm-6 offset-3">
              <div className="form-group ">
                <label htmlFor="nombre">Nombre</label>

                <input
                  type="text"
                  className="form-control form_input "
                  id="nombre"
                  value={nombre}
                  onChange={(e) => {
                    setNombre(e.target.value);
                  }}
                />
              </div>

              <div className="form-group ">
                <label htmlFor="nombre">Posicion</label>
                <input
                  type="text"
                  className="form-control form_input"
                  id="position"
                  value={position}
                  onChange={(e) => {
                    setPosition(e.target.value);
                  }}
                />
              </div>

              <div className="form-group ">
                <label htmlFor="nombre">Nivel</label>
                <input
                  type="text"
                  className="form-control form_input"
                  id="level"
                  value={nivel}
                  onChange={(e) => {
                    setNivel(e.target.value);
                  }}
                />
              </div>

              <button onClick={handleSubmit} className="btn btn-primary mt-4">
                Crear
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <ListaJugadores />
          </div>
        </div>
      </div> */}
    </>
  );
}

export default AgregarJugadores;
