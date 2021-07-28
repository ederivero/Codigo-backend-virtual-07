import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Habitaciones } from './Components/Habitaciones';
import { Login } from './Components/Login';
import { Registro } from './Components/Registro';
import { LoginClass } from './Services/Login/login';

function App() {

  const _Auth = new LoginClass()

  return (
    <Router>
      <Switch>
        <Route path="/usuario" render={() => {
          if (_Auth.estaLogeado()) return <Habitaciones />
          else return <Redirect to="/" />
        }} />
        <Route path="/registro" render={() => <Registro />} />
        <Route path="/" exact render={() => {
          if (_Auth.estaLogeado()) return <Habitaciones />
          else return <Login />
        }} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </Router>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
