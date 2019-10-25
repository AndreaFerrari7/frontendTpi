import React from "react";
import ReactDOM from "react-dom";
import MainPage from "./pages/MainPage.js";
import { Router, Route, Switch } from "react-router-dom"; //{}=variabile
import "./styles.css";
import Registration from "./pages/Registration.js";
import AddPrenotazione from './pages/AddPrenotazione.js';
import Evento from './pages/EventoPage.js';
import MyPrenotazioni from './pages/MyPrenotazioni.js';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path ="/registrazione" exact component={Registration}/>
        <Route path = '/addPrenotazione' exact component={AddPrenotazione}/>
        <Route path ='/evento' exact component={Evento}/>
        <Route path = '/prenotazioni' exact component={MyPrenotazioni}/>
      </Switch>
    </Router>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
