import React, { Component } from 'react';
import './Login.css';
import Dashboardservice from '../Service/Dashboardservice';
import history from '../Router/history/history';
import dashboard from '../Dashboard/Dashboard';
import Auth from '../helper/auth';
class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			usernameOrEmail: '',
			password: '',
			loading: true,
			errorMesg:''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange = (event) => {
		this.setState({
			[event.target.id]: event.target.value,
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		const data = {
			usernameOrEmail: this.state.usernameOrEmail,
			password: this.state.password,
		};
		Dashboardservice.login(data)
			.then((response) => {
				if (response.statusInfo.statusCode === 200) {
					localStorage.setItem('user', JSON.stringify(response.responseData));
					history.push('dashboard');
					window.location.reload();

				} else if (response.statusInfo.statusCode === 401) {
					this.setState({
						errorMesg: response.statusInfo.errorMessage,
					});
				}
			})
			.catch((error) => {
				this.setState({ error, loading: false });
			});
	};
	render() {
		const{errorMesg} = this.state
		return (
			<div>
				<div className='container'>
					<div className='col-md-2'></div>
					<div style = {{textAlign:"left" , color:"green"}}>
						<h1>Login</h1>
						{errorMesg.length > 0  && 
                           <span className='text-danger text-center textError'>{errorMesg}</span>}
					</div>
					
					<div className='col-md-8 loginBorder'>
						<form onSubmit={this.handleSubmit}>
							<div className='form-group'>
								<label className="loginLabel">User Name</label>
								<input
									type='text' className="loginText"
									value={this.state.usernameOrEmail}
									id='usernameOrEmail'
									onChange={this.handleChange}
									required
								/>
							</div>
							<div className='form-group'>
								<label className="loginLabel">Password</label>
								<input
									type='password' className="loginText"
									id='password'
									value={this.state.password}
									onChange={this.handleChange}
									required
								/>
							</div>
							<div className='form-group'>
								<button type='submit' className='btn btn-lg btnLoginForm'>
									Login
								</button>
							</div>
						</form>
					</div>
					<div className='col-md-2'></div>
				</div>
			</div>
		);
	}
}
export default Login;
