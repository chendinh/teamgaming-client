// Libraries
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Components
import indexRoutes from 'routes/index.js';

function App() {
    return (
        <Router>
            <Switch>
                {indexRoutes.map((route, key) => {
                    return <Route exact={route.isExact} path={route.path} key={key} component={route.component} />;
                })}   
            </Switch>
        </Router>
    );
}

export default App;
