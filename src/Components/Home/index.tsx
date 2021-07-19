// import { useState } from "react";
import { Login } from "./Login";
import IMG from '../../Media/wing.png';

interface Task {
    actEnlace: () => void
}

const Home: React.FC<Task> = (props) => {

    return (
        <div className="home-page">
            <div className="home-page-login">
                <Login />
            </div>
            <div className="home-page-promo">
                <img src={IMG} alt="shopify" />
            </div>
        </div>
    )
}

export { Home }