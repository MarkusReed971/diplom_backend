import React from 'react'
import {BrowserRouter} from "react-router-dom";
import './App.css'
import Header from "./components/Header";
import {withContext} from "./components/Context";
import {useRoutes} from "./components/Routes";
import Toner from "./components/Toner";

const App = ({context}) => {
    const routes = useRoutes(context.user)

    return (
        <BrowserRouter>
            <div className={'container'}>
                {context.isToner ? <Toner /> : null}
                <Header />
                {routes}
            </div>
        </BrowserRouter>
    );
}

export default withContext(App)
