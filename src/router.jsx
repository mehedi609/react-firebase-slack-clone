import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import App from "./component/App";
import Register from "./component/Auth/Register";
import Login from "./component/Auth/Login";

class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={App}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/register' component={Register}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Router;
