import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

// import {Router, Switch} from "react-router-dom";
import Dashboard from '../Dashboard/Dashboard';

class AppRoutes extends Component{
    render(){
        // const { path } = this.props.match;

        return(
            <Router>
            <div>
                <Dashboard>
                <Switch>
                  
                   <Route exact path = "/" component = {Dashboard} />
                  
                   
               </Switch>
               </Dashboard>
            </div>
         </Router>
        );
    }
}

export default AppRoutes;