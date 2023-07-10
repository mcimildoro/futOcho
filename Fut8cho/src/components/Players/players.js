import React, { useEffect, useState } from "react";
import axios from "axios";
import Bootstrap from "bootstrap/dist/css/bootstrap.css";
import Rating from "@mui/material/Rating";
import { Fab } from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";
import AddIcon from "@mui/icons-material/Add";

import "./players.scss";

const Players = () => {
  const [data, setData] = useState([]);
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);
  const [team3, setTeam3] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const [teamSabado, setTeamSabado] = useState([]);

  const getData = async () => {
    try {
      //extrae los datos de la base de datos mongodb
      const response = await axios.get("./jugadores_new.json");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const findPlayer = (name) => {
    const player = data.find((player) => player.name === name);
    return player;
  };

  const handleInput = async (e) => {
    setData([...data, { name: e.target.value }]);
    setSearchTerm(e.target.value);
    const string = searchTerm;
    //separa el string en un array de strings y elimina los espacios en blanco
    const array = string.split(",").map((item) => item.trim());

    const arrayPlayers = array.map((index) => {
      const player = findPlayer(index);
      return player;
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const sumLevel = (team) => {
    const sum = team.reduce((acc, player) => acc + player.level, 0);
    return sum;
  };

  //crea una lista de 24 jugadores buscando por nombre en la base de datos y agregalos a teamSabado
  const createTeamSabado = () => {
    const teamSabado = [];
    const players = [...data];
    while (teamSabado.length < 24) {
      const random = Math.floor(Math.random() * players.length);
      const player = players.splice(random, 1)[0];
      teamSabado.push(player);
    }
    setTeamSabado(teamSabado);
  };

  const createTeams = () => {
    const team1 = [];
    const team2 = [];
    const team3 = [];
    const players = [...data];
    //console.log(data);
    while (players.length > 0) {
      const random = Math.floor(Math.random() * players.length);
      const player = players.splice(random, 1)[0];

      if (team1.length < 8) {
        team1.push(player);
      } else if (team2.length < 8) {
        team2.push(player);
      } else {
        team3.push(player);
      }
    }
    const number1 = 25.65;
    const number2 = 27.1;
    const decimal = number1.toFixed(2);
    const decimal2 = number2.toFixed(2);

    if (
      sumLevel(team1) >= decimal &&
      sumLevel(team1) <= decimal2 &&
      sumLevel(team2) >= decimal &&
      sumLevel(team2) <= decimal2 &&
      sumLevel(team3) >= decimal &&
      sumLevel(team3) <= decimal2
    ) {
      setTeam1(team1);
      setTeam2(team2);
      setTeam3(team3);
    } else {
      createTeams();
    }
  };

  return (
    <>
      <div className="container overflow-hidden text-center">
        <div className="row">
          <div className="col-12">
            <h1 className="title display-6 material-symbols-outlined">
              Fut8cho{" "}
              <span role="img" aria-label="soccer">
                ⚽
              </span>
            </h1>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <textarea type="text" value={searchTerm} onChange={handleInput} />

            <button onClick={handleInput}>Crear equipos</button>
          </div>
        </div>

        <div className="row">
          <div className="col-6 col-sm-6">
            <Fab
              variant="extended"
              size="small"
              color="primary"
              aria-label="add"
              href="/crearPlayers"
            >
              <NavigationIcon sx={{ mr: 1 }} />
              Agregar Jugadores
            </Fab>
            <Fab
              variant="extended"
              size="small"
              color="primary"
              aria-label="add"
              onClick={createTeams}
              type="button"
            >
              <AddIcon sx={{ mr: 1 }} />
              Create Teams
            </Fab>
          </div>
        </div>

        {team1.length > 0 && (
          //order by level.
          <div className="row justify-content-center">
            <div className="col-md-3 col-sm-8 ">
              <h2 className="team_tittle">Team 1</h2>
              <ul className="list-group">
                {team1
                  .sort((a, b) => b.level - a.level)
                  .map((player) => (
                    <li className="list-group-item" key={player.id}>
                      {player.name}
                      <Rating
                        className="rating"
                        name="size-small"
                        value={player.level}
                        readOnly
                        size="small"
                      />
                    </li>
                  ))}
              </ul>
            </div>
            <div className="col-md-3 col-sm-8 ">
              <h2 className="team_tittle">Team 2</h2>
              <ul className="list-group">
                {team2
                  .sort((a, b) => b.level - a.level)
                  .map((player) => (
                    <li className="list-group-item" key={player.id}>
                      {player.name}
                      <Rating
                        className="rating"
                        name="size-small"
                        value={player.level}
                        readOnly
                        size="small"
                      />
                    </li>
                  ))}
              </ul>
            </div>
            <div className="col-md-3 col-sm-8">
              <h2 className="team_tittle">Team 3</h2>
              <ul className="list-group">
                {team3
                  .sort((a, b) => b.level - a.level)
                  .map((player) => (
                    <li className="list-group-item" key={player.id}>
                      {player.name}
                      <Rating
                        className="rating"
                        name="size-small"
                        value={player.level}
                        readOnly
                        size="small"
                      />
                    </li>
                  ))}
              </ul>
            </div>

            {team1.length > 0 && (
              <div
                className="col--md-4 col-sm-8"
                style={{ marginBottom: "30px" }}
              >
                <h2 className="team_tittle">Average</h2>
                <ul className="list-group text-center">
                  <li className="list-group-item">
                    Team 1:{" "}
                    <tittle>{sumLevel(team1).toFixed(2)} Average</tittle>
                  </li>
                  <li className="list-group-item">
                    Team 2:{" "}
                    <tittle>{sumLevel(team2).toFixed(2)} Average</tittle>
                  </li>
                  <li className="list-group-item">
                    Team 3:
                    <tittle> {sumLevel(team3).toFixed(2)} Average</tittle>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Players;
