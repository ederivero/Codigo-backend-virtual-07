import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { Home } from './Components/Home';
import './App.css';
import { Usuarios } from "./Components/Usuarios";
import { AuthClass } from "./Services/AuthServices";

function App() {

  const _Auth = new AuthClass()

  const actEnlace = () => {
    console.log('Funciona')
  }

  return (
    <Router>
      <Switch>
        <Route path="/users" render={() => {
          if (_Auth.estaLogeado()) return <Usuarios />
          else return <Redirect to="/" />
        }} />
        <Route path="/" exact render={() => {
          if (_Auth.estaLogeado()) return <Usuarios />
          else return <Home actEnlace={actEnlace} />
        }} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </Router>
  );
}

export default App;
