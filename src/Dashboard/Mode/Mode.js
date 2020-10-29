import React, { Component } from 'react'
import './Mode.css';
import Dashboard from '../Dashboard';
import Dashboardservice from '../../Service/Dashboardservice';
import styled from 'styled-components';
const Active = styled.div`

.formAdmin{
    margin-top:30px;
}
`;
export default class Mode extends Component {
    constructor(props) {
		super(props);
		this.state = {
			request: [],
			lang: '',
			value: '',
			mode: '',
			
		};
		
        this.handleSelect = this.handleSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    
    handleSelect = (e) => {
		this.setState({
			mode: e.target.value,
		});
    };
    

	handleSubmit = (e) => {
		e.preventDefault();
		console.log('handle request ');
		const data = {
			lang: this.state.lang,
			value: this.state.value,
			mode: this.state.mode,
		};
		/****api pass respective value as we are creating in ui as array of object before add api*/
		Dashboardservice.addCompilerMode(data)
			.then((res) => {
				if (res.statusInfo.statusCode === 200) {
					this.setState({
						request: res.responseData,
					});
				}
			})
			.catch((error) => {
				console.log('error message: ', error);
				alert('error is getting..');
            });
        }
  render() {
    return (
        <Active>
        	<div className='container'>
					<div className='col-md-12 adminRight'>
						<Dashboard></Dashboard>
						<div className='row formAdmin'>
							<label className='col-md-2' for='inputName'>
								Question
							</label>
							<div className='col-md-5'>
								<select
									className='mdb-select md-form colorful-select dropdown-primary selectBoxs'
									onChange={this.handleSelect}
								>
									{this.state.request.map((req, index) => {
										return (
											<option name={req.lang} value={req.lang}>
												{req.mode}
											</option>
										);
									})}
								</select>
							</div>
						</div>
               

               <div className='row formAdmin'>
							<div className='col-md-3'></div>
							<div className='col-md-5'>
								<button
									className='btn btn-primary btn-lg btn-block'
									onClick={this.handleSubmit}
								>
									Submit
								</button>
							</div>
						</div>
					</div>
           </div>
      </Active>
    )
  }
}
