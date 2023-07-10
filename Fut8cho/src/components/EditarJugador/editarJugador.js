import React, { useEffect, useState } from "react";
import axios from "axios";
import uniquid from "uniqid";
import { useParams } from "react-router-dom";
import "./editarJugador.scss";
import { useNavigate } from "react-router-dom";

const EditarJugador = (props) => {
  const params = useParams();

  const [nombre, setNombre] = useState("");
  const [position, setPosition] = useState("");
  const [nivel, setNivel] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/actualizarJugador/${params.id}`)
      .then((res) => {
        setNombre(res.data.name);
        setPosition(res.data.position);
        setNivel(res.data.nivel);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const editarJugador = (id) => {
    const jugador = {
      name: nombre,
      position: position,
      nivel: nivel,
    };
    console.log("jugador" + jugador);
    axios
      .get(`/api/actualizarJugador/${params.id}`, jugador)
      .then((res) => {
        console.log("jugador agregado!");
        navigate(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log("nombre" + nombre);

  function handleSubmit(e) {
    e.preventDefault();
    editarJugador();
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 mt-4">
            <h1>Editar jugadores</h1>
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
                Editar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditarJugador;
