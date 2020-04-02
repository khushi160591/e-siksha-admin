import React , {Component} from 'react';
import './Dashboard.css';
import { IoIosArrowDown } from "react-icons/io";
import { BrowserRouter, Route, Link } from "react-router-dom";
 import Addmenu from './Menu/Addmenu';
 import Addtopic from './Topic/Addtopic';
import Listtopic from './Topic/Listtopic';
import Listmenu from './Menu/Listmenu';
import Addsubtopic from './Subtopic/Addsubtopic';
import Listsubtopic from './Subtopic/Listsubtopic';
import Addtheory from './Theory/Addtheory';
import Addmultiple from './Multiple/Addmultiple';

class Dashboard extends Component{
    render(){
        // const { path } = this.props.match;
        const mystyle = {
           float:"right"
          };
        return(
      <div>
          
          <div className="container adminBg">
              <div className="row">
                  <div className="col-md-12">
                      {/* <div className="adminHeader">
                          <h3>Dashboard</h3>
                      </div> */}
                      <div className="dashboardPage">
                      <div className="col-md-3">
                      <nav className="navigation">
                        <ul className="mainmenu">
                            <li><Link to = '/'>Menu <IoIosArrowDown style={mystyle}/></Link>
                            <ul className="submenu">
                                <li><a><Link to = '/menu/add'>Add menu</Link></a></li>
                                <li><a><Link to = '/menu/list'>List menu</Link></a></li>
                               
                            </ul>
                           

                            </li>
                            <li><Link to = '/'>Topics <IoIosArrowDown style={mystyle}/></Link>
                            <ul className="submenu">
                            <li><a><Link to = '/topic/add'>Add topic</Link></a></li>
                                <li><a><Link to = '/topic/list'>List topic</Link></a></li>
                            </ul>
                            </li>
                            <li><Link to = '/'>SubTopics <IoIosArrowDown style={mystyle}/></Link>
                            <ul className="submenu">
                            <li><a><Link to = '/subtopic/add'>Add subtopic</Link></a></li>
                                <li><a><Link to = '/subtopic/list'>List subtopic</Link></a></li>
                            </ul>
                            </li>
                            <li><Link to = '/'> Theory <IoIosArrowDown style={mystyle}/></Link>
                            <ul className="submenu">
                            <li><a><Link to = '/theory/add'>Add theory</Link></a></li>
                            </ul>
                            </li>
                            <li><Link to = '/'> Multiple <IoIosArrowDown style={mystyle}/></Link>
                            <ul className="submenu">
                            <li><a><Link to = '/multiple/add'>Add multiple</Link></a></li>
                            </ul>
                            </li>
                        </ul>
                        </nav>
                      </div>
                    

                  </div>
                  <Route path = "/menu/add"  component = {Addmenu} />
                   <Route path = "/menu/list" component = {Listmenu} />
                    <Route path = "/topic/add"  component = {Addtopic} />
                   <Route path = "/topic/list"  component = {Listtopic} /> 
                   <Route path = "/subtopic/add"  component = {Addsubtopic} />
                   <Route path = "/subtopic/list"  component = {Listsubtopic} /> 
                   <Route path = "/theory/add"  component = {Addtheory} /> 
                   <Route path = "/multiple/add"  component = {Addmultiple} /> 
                  </div>
              </div>
          </div>
      </div>
        );
    }
}

export default Dashboard;