
import Players from './components/Players/players';
import ListaJugadores from './components/ListaJugadores/ListaJugadores';
import AgregarJugadores from './components/AgregarJugadores/AgregarJugadores';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Players/>} > </Route>
          <Route path="/players" element={<ListaJugadores/>} ></Route>
          <Route path="/crearPlayers" element={<AgregarJugadores/>} ></Route>
        </Routes>
       
      </BrowserRouter>
    </div>
  );
}

export default App;
