import { useState } from "react"
import { NavLink, Switch, Route, Redirect } from "react-router-dom"
import { DashboardHeader } from "./DashboardHeader"
import { Movimientos } from "./Movimientos"
// import { Products } from "./Products"
import { Products } from './Products'
import { Register } from "./Register"

interface ITask {
    name: string,
    route: string,
    icon: string,
}

const dashLinks: ITask[] = [
    {
        name: 'Dashboard',
        route: '/users/products',
        icon: 'fas fa-th-large'
    },
    {
        name: 'Movement',
        route: '/users/movimientos',
        icon: 'fas fa-clipboard'
    },
    {
        name: 'Users',
        route: '/users/register',
        icon: 'fas fa-user'
    },
    {
        name: 'Report',
        route: '/reports',
        icon: 'fas fa-chart-pie'
    },
    {
        name: 'Product',
        route: '/products',
        icon: 'fas fa-tag'
    },
    {
        name: 'Invoice',
        route: '/invoinces',
        icon: 'fas fa-store'
    },
]

const Usuarios = () => {

    const [upTitle, setUpTitle] = useState<string>('Dashboard')

    const updateTitle = (prop: any) => (event: any) => {
        setUpTitle(prop)
    }

    return (
        <div className="users-dashboard">
            <div className="users-dashboard-nav">
                <h2>StoreTasker</h2>
                {
                    dashLinks.map((data, i) => <NavLink
                        key={i}
                        to={data.route}
                        activeStyle={{
                            backgroundColor: '#0075FF',
                            color: 'whitesmoke'
                        }}
                        onClick={updateTitle(data.name)}
                    >
                        <i style={{ marginRight: 5 }} className={data.icon}></i> {data.name}
                    </NavLink>)
                }
            </div>
            <div className="users-dashboard-content">
                <div>
                    <div className="users-dashboard-content-header">
                        <DashboardHeader title={upTitle} />
                    </div>
                    <div className="users-dashboard-content-body">
                        <Switch>
                            <Route path="/users/products" render={() => <Products />} />
                            <Route path="/users/movimientos" render={() => <Movimientos />} />
                            <Route path="/users/register" render={() => <Register />} />
                            <Route render={() => <Redirect to="/users/products" />} />
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { Usuarios }