import React from 'react';
import { Route } from 'react-router-dom';
import './app.css';
import Signup from '../signup/signup';
import Login from '../login/login';
import Profiles from '../table/table';

const App = () => {
    return (
        <div className="app">
            <Route path={"/signup"} component={Signup}></Route>
            <Route path={"/login"} component={Login}></Route>
            <Route path={"/table"} component={Profiles}></Route>
        </div>
                 
    )
}

export default App;