import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ListaJugadores.scss";
import { useNavigate } from "react-router-dom";

//lista de jugadores

function ListaJugadores() {
  //hooks
  const navigate = useNavigate();
  const [dataJugadores, setDataJugadores] = useState([]);
  const [nombre, setNombre] = useState("");
  const [position, setPosition] = useState("");
  const [nivel, setNivel] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    axios
      .get("/api/ListadoJugadores")
      .then((res) => {
        setDataJugadores(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //eliminar jugador por id

  const deleteJugador = (id) => {
    axios
      .delete(`/api/ListadoJugadores/${id}`)
      .then((res) => {
        console.log("jugador " + res.data.name + " eliminado");
        navigate(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //actuilizar un jugador

  const updateJugador = async (_id) => {
    const jugador = {
      nombre: nombre,
      position: position,
      nivel: nivel,
      id: id,
    };
    const res = await axios.post(`/ListadoJugadores/${_id}`, jugador);
    console.log(res);
    console.log("jugador " + res.data.name + " actualizado");
    navigate(`/api/actualizarJugador/${_id}`);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mt-4">
          <h1>Lista de jugadores</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12 offset-12">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Posicion</th>
                <th scope="col">Nivel</th>
              </tr>
            </thead>
            <tbody>
              {dataJugadores.map((jugador) => (
                <tr key={jugador._id}>
                  <td>{jugador.name}</td>
                  <td>{jugador.position}</td>
                  <td>{jugador.nivel}</td>
                  <td>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => deleteJugador(jugador._id)}
                      value={jugador._id}
                    >
                      Eliminar
                    </button>
                    <button
                      className="btn btn-outline-primary"
                      onClick={() => updateJugador(jugador._id)}
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ListaJugadores;
