import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route ,Redirect} from "react-router-dom";
import Auth from '../helper/auth';
import history from './history/history';
import Dashboard from '../Dashboard/Dashboard';
import Login from '../Login/Login';
import Addmenu from '../Dashboard/Menu/Addmenu';
import Listmenu from '../Dashboard/Menu/Listmenu';
import Addtopic from '../Dashboard/Topic/Addtopic';

import Listtopic from '../Dashboard/Topic/Listtopic';
import Addsubtopic from '../Dashboard/Subtopic/Addsubtopic';
import Listsubtopic from '../Dashboard/Subtopic/Listsubtopic';
import Addtheory from '../Dashboard/Theory/Addtheory';
import Addmultiple from '../Dashboard/Multiple/Addmultiple';
import Solutionques from '../Dashboard/Solution/Solutionques';
import Mode from '../Dashboard/Mode/Mode';
import TheoryDetail from '../Dashboard/TheoryDetail/Theorydetail';
import Solutionadd from '../Dashboard/Solution/SolutionAdd/Solutionadd';
import Testcases from '../Dashboard/TestCases/Testcases';

class AppRoutes extends Component{
    render(){
        // const { path } = this.props.match;

        return(
            <Router history={history}>
            <div>
               
                <Switch>
                  
                   <Route exact path = "/" component = {Login} />
                   <PrivateRoute exact path = "/dashboard" component = {Dashboard} />
                   <PrivateRoute path = "/menu/add"  component = {Addmenu} />
                   <PrivateRoute path = "/menu/list" component = {Listmenu} />
                    <PrivateRoute path = "/topic/add"  component = {Addtopic} />
                   <PrivateRoute path = "/topic/list"  component = {Listtopic} /> 
                   <PrivateRoute path = "/subtopic/add"  component = {Addsubtopic} />
                   <PrivateRoute path = "/subtopic/list"  component = {Listsubtopic} /> 
                   <PrivateRoute path = "/theory/add"  component = {Addtheory} /> 
                   <PrivateRoute path = "/multiple/add"  component = {Addmultiple} /> 
                   <PrivateRoute exact path = "/solution/add"  component = {Solutionques} /> 
                   <PrivateRoute path = "/theorydetail/add"  component = {TheoryDetail} /> 
                   <PrivateRoute exact path = "/solution/add/question"  component = {Solutionadd} /> 
                    <PrivateRoute  path = "/testcase/add"  component = {Testcases} /> 

               </Switch>
            </div>
         </Router>
        );
    }
}
const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        Auth.isLoggedIn() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/" }} />
          
        )
      }
    />
  );
export default AppRoutes;