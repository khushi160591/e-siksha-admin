import React, { Component } from 'react';
import './Dashboard.css';
import { IoIosArrowDown } from 'react-icons/io';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import Addmenu from './Menu/Addmenu';
import Addtopic from './Topic/Addtopic';
import Listtopic from './Topic/Listtopic';
import Listmenu from './Menu/Listmenu';
import Addsubtopic from './Subtopic/Addsubtopic';
import Listsubtopic from './Subtopic/Listsubtopic';
import Addtheory from './Theory/Addtheory';
import Addmultiple from './Multiple/Addmultiple';
import Auth from '../helper/auth';
import history from '../Router/history/history';
class Dashboard extends Component {
	constructor(props) {
		super(props);
		//  if (!Auth.isLoggedIn()) {
		//       history.push("/");
		//  }
	}
	render() {
		// const { path } = this.props.match;
		const mystyle = {
			float: 'right',
		};
		return (
			<div>
				<div className='container adminBg'>
					<div className='row'>
						<div className='col-md-12'>
							<div className='dashboardPage'>
								<div className='col-md-3'>
									<nav className='navigation'>
										<ul className='mainmenu'>
											<li>
												<Link to='/'>
													Menu <IoIosArrowDown style={mystyle} />{' '}
												</Link>{' '}
												<ul className='submenu'>
													<li>
														<a>
															<Link to='/menu/add'> Add menu </Link>{' '}
														</a>{' '}
													</li>{' '}
													<li>
														<a>
															<Link to='/menu/list'> List menu </Link>{' '}
														</a>{' '}
													</li>{' '}
												</ul>{' '}
											</li>{' '}
											<li>
												<Link to='/'>
													Topics <IoIosArrowDown style={mystyle} />{' '}
												</Link>{' '}
												<ul className='submenu'>
													<li>
														<a>
															<Link to='/topic/add'> Add topic </Link>{' '}
														</a>{' '}
													</li>{' '}
													<li>
														<a>
															<Link to='/topic/list'> List topic </Link>{' '}
														</a>{' '}
													</li>{' '}
												</ul>{' '}
											</li>{' '}
											<li>
												<Link to='/'>
													SubTopics <IoIosArrowDown style={mystyle} />{' '}
												</Link>{' '}
												<ul className='submenu'>
													<li>
														<a>
															<Link to='/subtopic/add'> Add subtopic </Link>{' '}
														</a>{' '}
													</li>{' '}
													<li>
														<a>
															<Link to='/subtopic/list'> List subtopic </Link>{' '}
														</a>{' '}
													</li>{' '}
												</ul>{' '}
											</li>{' '}
											<li>
												<Link to='/'>
													{' '}
													Theory <IoIosArrowDown style={mystyle} />{' '}
												</Link>{' '}
												<ul className='submenu'>
													<li>
														<a>
															<Link to='/theory/add'> Add theory </Link>{' '}
														</a>{' '}
													</li>{' '}
												</ul>{' '}
											</li>{' '}
											<li>
												<Link to='/'>
													{' '}
													Solution <IoIosArrowDown style={mystyle} />{' '}
												</Link>{' '}
												<ul className='submenu'>
													<li>
														<a>
															<Link to='/solution/add'> Solution Question </Link>{' '}
														</a>{' '}
													</li>{' '}
												</ul>{' '}
											</li>{' '}

											<li>
												<Link to='/'>
													{' '}
													TheoryDetail <IoIosArrowDown style={mystyle} />{' '}
												</Link>{' '}
												<ul className='submenu'>
													<li>
														<a>
															<Link to='/theorydetail/add'> Theory </Link>{' '}
														</a>{' '}
													</li>{' '}
												</ul>{' '}
											</li>{' '}
											
											<li>
												<Link to='/'>
													{' '}
													Multiple <IoIosArrowDown style={mystyle} />{' '}
												</Link>{' '}
												<ul className='submenu'>
													<li>
														<a>
															<Link to='/multiple/add'> Add multiple </Link>{' '}
														</a>{' '}
													</li>{' '}
												</ul>{' '}
											</li>{' '}
										</ul>{' '}
									</nav>{' '}
								</div>{' '}
							</div>{' '}
						</div>{' '}
					</div>{' '}
				</div>{' '}
			</div>
		);
	}
}

export default Dashboard;
