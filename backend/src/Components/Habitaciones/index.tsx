import { Switch, Route, Redirect } from 'react-router-dom'
import { Canales } from './Canales'

const Habitaciones = () => {
    return (
        <Switch>
            <Route path="/usuario/canales" render={() => <Canales />} />
            <Route render={() => <Redirect to="/usuario/canales" />} />
        </Switch>
    )
}

export { Habitaciones }