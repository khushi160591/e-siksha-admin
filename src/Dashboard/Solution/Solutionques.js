import React, { Component } from 'react';
import './Solutionques.css';
import Dashboard from '../Dashboard';
import Dashboardservice from '../../Service/Dashboardservice';

export default class Solutionques extends Component {
	constructor(props) {
		super(props);
		this.state = {
			subtopicList: [],
			topicList: [],
			questionLists:[],
			subtopicId: 0,
			question: '',
			title: '',
			description: '',
			code: '',
			mode: '',
			questionId:'',
			timeComplexity: '',
			spaceComplexity: '',
			basicQuestionList: [],
			subtopicName: '',
			topicName: '',
			isCoding: undefined,
			type: '',
			selectedSubtopic: {},
			subTopicMap: new Map(),
			questionList:[]
		};
		this.handleTopicSelect = this.handleTopicSelect.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.getQuestion = this.getQuestion.bind(this);
		this.handleSelectType = this.handleSelectType.bind(this);
		this.handleSelectCoding = this.handleSelectCoding.bind(this);
		this.handleSubtopicSelect = this.handleSubtopicSelect.bind(this);
		this.handleQuestionSelect = this.handleQuestionSelect.bind(this);
	}

	handleSelect = (e) => {
		this.setState({
			mode: e.target.value,
		});
	};
	handleSelectType = (e) => {
	  
		const type = e.target.value
		const coding = this.state.isCoding
		const selectedSubtopic = this.state.selectedSubtopic
		if(type !== '' && coding !== undefined && selectedSubtopic !== undefined){
			this.getQuestion(type,coding,selectedSubtopic)
		}else{
			this.setState({type:type})
		}
	};

	handleSelectCoding = (e) => {
		const coding = e.target.value
		const type = this.state.type
		const selectedSubtopic = this.state.selectedSubtopic
		if(type !== '' && coding !==undefined && selectedSubtopic !== undefined){
			this.getQuestion(type,coding,selectedSubtopic)
		}else{
			this.setState({isCoding:coding})
		}
	};
	handleChange = (e) => {
		this.setState({
			[e.target.id]:
				e.target
					.value /***generic call for achieve target on input or textarea  */,
		});
	};
	handleTopicSelect = (e) => {
		const topicID =	e.target.value; /***getting value as string convert to integer and pass PARAMETER inside subtopic api method */
		this.getSubtopicList(topicID);
	};
	componentDidMount() {
		this.getTopic();
	}

	getTopic() {
		Dashboardservice.getTopicList()
			.then((res) => {
				if (res.statusInfo.statusCode === 200) {
					this.getSubtopicList(
						res.responseData[0].id
					); /************subtopic api will get response through  id and change based on topiclist id */
					this.setState({
						topicList:
							res.responseData /*******based on topicList response subtopic list should change */,
					});
				}
			})
			.catch((error) => {
				console.log('error message: ', error);
				alert('error is getting..');
			});
	}

	handleSubtopicSelect = (event) => {
		const subtId = event.target.value
		const type = this.state.type
		const coding = this.state.isCoding
		const subtopic = {
			id: subtId,
			name: this.state.subTopicMap.get(subtId),
		};
		if(type !== '' && coding !==undefined && subtopic !== undefined){
			this.getQuestion(type,coding,subtopic)
		}else{
			this.setState({selectedSubtopic:subtopic})
		}
		
				
	};

	getSubtopicList(id) {
		const query = '?topicId=' + id; /**query for pass url as topicid */
		Dashboardservice.getSubtopicList(query)
			.then((res) => {
				if (res.statusInfo.statusCode === 200) {
					var map = new Map();
					res.responseData.subTopics.forEach((subtopic) => {
						map.set(subtopic.id, subtopic.name);
					});
					const subtopic = {
						id: res.responseData.subTopics[0].id,
						name: res.responseData.subTopics[0].name,
					};

					/***get response based on api pass on backeend */
					this.setState({
						subtopicList: res.responseData.subTopics,
						selectedSubtopic: subtopic,
						subTopicMap: map,
					});
				}
			})
			.catch((error) => {
				console.log('error message: ', error);
				alert('error is getting..');
			});
	}

	
	

	handleQuestionSelect = (event) => {
		this.setState({
			questionId : event.target.value
		})
	};

	getQuestion = (type,coding,subtopic) => {
		var theoryQuery ='?subtopicId=' + subtopic.id + '&isCoding=' + coding + '&type=' + type;
		Dashboardservice.getQuestions(theoryQuery)
			.then((res) => {
				if (res.statusInfo.statusCode == 200) {
					this.setState( {
						questionLists: res.responseData,
						questionId:res.responseData[0].id,
						type:type,
						selectedSubtopic:subtopic,
						isCoding:coding
						} )
				}
			})
			.catch((error) => {
				console.log('error message: ', error);
				alert('error is getting..');
			});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		console.log('handle request ');
		const data = {
			questionId: this.state.questionId,
			title: this.state.title,
			description: this.state.description,
			answer: this.state.answer,
			timeComplexity: this.state.timeComplexity,
			spaceComplexity: this.state.spaceComplexity,
			code: this.state.code,
			mode: this.state.mode
		};
		Dashboardservice.addSolutionQues(data)
			.then((res) => {
				if (res.statusInfo.statusCode === 200) {
					alert('successful....');
				}
			})
			.catch((error) => {
				console.log('error message: ', error);
				alert('error is getting..');
			});
	};

	render() {
		return (
			<div>
				<div className='container'>
					<div className='col-md-12 adminRight'>
						<Dashboard></Dashboard>
						<div className='row formAdmin'>
							<label className='col-md-2' for='inputName'>
								TopicName
							</label>
							<div className='col-md-5'>
								<select
									className='mdb-select md-form colorful-select dropdown-primary selectBoxs'
									onChange={this.handleTopicSelect}
								>
									{this.state.topicList.map((topic, index) => {
										return (
											<option name={topic.id} value={topic.id}>
												{topic.name}
											</option>
										);
									})}
								</select>
							</div>
						</div>
						<div className='row formAdmin'>
							<label className='col-md-2' for='inputName'>
								SubTopicName
							</label>
							<div className='col-md-5'>
								<select
									className='mdb-select md-form colorful-select dropdown-primary selectBoxs'
									onChange={this.handleSubtopicSelect}>
									{this.state.subtopicList.map((subtopic, index) => {
										return (
											<option name={subtopic.id} value={subtopic.id}>
												{subtopic.name}
											</option>
										);
									})}
								</select>
							</div>
						</div>
					

						<div className='row formAdmin'>
							<label className='col-md-2' for='inputName'>
								Coding
							</label>
							<div className='col-md-5'>
								<select
									className='mdb-select md-form colorful-select dropdown-primary selectBoxs'
									onChange={this.handleSelectCoding}
								>
									  <option name = "default" value = {undefined}>Select the Value</option>
									<option name='basic' value={true}>
										True
									</option>
									<option name='advanced' value={false}>
										False
									</option>
								</select>
							</div>
						</div>
					

						<div className='row formAdmin'>
							<label className='col-md-2' for='inputName'>
								Type
							</label>
							<div className='col-md-5'>
								<select
									className='mdb-select md-form colorful-select dropdown-primary selectBoxs'
									onChange={this.handleSelectType}
								>
									  <option name = "default" value = "">Select the Value</option>
									<option name='basic' value="BASIC">
										Basic
									</option>
									<option name='advanced' value="ADVANCED">
										advanced
									</option>
								</select>
							</div>
						</div>

						<div className='row formAdmin'>
							<label className='col-md-2' for='inputName'>
								Questions
							</label>
							<div className='col-md-5'>
								<select
									className='mdb-select md-form colorful-select dropdown-primary selectBoxs'
									onChange={this.handleQuestionSelect}>
									{this.state.questionLists.map((item, index) => {
										return (
											<option name={item.id} value={item.id}>
												{item.question}
											</option>
										);
									})}
								</select>
							</div>
						</div>
						<div className='row formAdmin'>
							<label className='col-md-2' for='inputName'>
								Mode
							</label>
							<div className='col-md-5'>
								<select
									className='mdb-select md-form colorful-select dropdown-primary selectBoxs'
									onChange={this.handleSelect}
								>
								<option name = "default" value = "">Select the Value</option>
									<option name='basic' value="PYTHON">
										text/x-python
									</option>
									<option name='advanced' value="JAVA">
										text/x-java
									</option>
									<option name='advanced' value="C">
										text/x-c
									</option>
									<option name='advanced' value="C++">
										text/x-c++
									</option>
								</select>
							</div>
						</div>

						<div className='row formAdmin'>
							<label className='col-md-2' for='description'>
								Title
							</label>
							<div className='col-md-5'>
								<input
									type='text'
									className='form-control formText-one'
									id='title'
									placeholder='Title'
									onChange={this.handleChange}
								/>
							</div>
						</div>
						<div>
							<div className='row formAdmin'>
								<label className='col-md-2' for='explanationAns'>
									Description
								</label>
								<div className='col-md-5'>
									<textarea
										className='form-control formText-two'
										id='description'
										placeholder='Description'
										onChange={this.handleChange}
									></textarea>
								</div>
							</div>
						</div>
						<div className="row formAdmin">
                <label className="col-md-2" for="code">Code</label>
                <div className="col-md-5">
                    <textarea className="form-control formText-two" id="code" placeholder="Code" onChange={this.handleChange}></textarea>
                </div>
            </div>
       
						<div className='row formAdmin'>
							<label className='col-md-2' for='description'>
								TimeComplexity
							</label>
							<div className='col-md-5'>
								<input
									type='text'
									className='form-control formText-one'
									id='timeComplexity'
									placeholder='TimeComplexity'
									onChange={this.handleChange}
								/>
							</div>
						</div>
						<div className='row formAdmin'>
							<label className='col-md-2' for='description'>
								SpaceComplexity
							</label>
							<div className='col-md-5'>
								<input
									type='text'
									className='form-control formText-one'
									id='spaceComplexity'
									placeholder='SpaceComplexity'
									onChange={this.handleChange}
								/>
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
			</div>
		);
	}
}
