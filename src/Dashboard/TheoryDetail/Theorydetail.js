import React, { Component } from 'react';
import './TheoryDetail.css';
import Dashboard from '../Dashboard';
import Dashboardservice from '../../Service/Dashboardservice';
class TheoryDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subtopicList: [],
            topicList: [],
            subtopicId: 0,
            subtopicName: '',
            topicName: '',
            selectedSubtopic: {},
            subTopicMap: new Map(),
            pageNo: '',
            description: ''
        }
        this.handleTopicSelect = this.handleTopicSelect.bind(this);
       this.handleSelectPages=this.handleSelectPages.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

	handleSelectPages = (e) => {
		this.setState({
			pageNo: e.target.value,
		});
    };
    handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value /***generic call for achieve target on input or textarea  */,
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

	handleSubtopicSelect = event =>{
        const  subtId = event.target.value;
        const subtopic = {
        id : subtId,
        name : this.state.subTopicMap.get(subtId)
        }
        this.setState({
        selectedSubtopic: subtopic
        })
        }

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

	handleSubmit = (e) => {
		e.preventDefault();
		console.log('handle request ');
		const data = {
			pageNo: this.state.pageNo,
			description: this.state.description,
			
		};
		Dashboardservice.addTheoryDetail(data)
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
                        <div className="row formAdmin">
                            <label className="col-md-2" for="code">Description</label>
                            <div className="col-md-5">
                                <textarea className="form-control formText-two" id="description" placeholder="description" onChange={this.handleChange}>

                                </textarea>
                            </div>
                        </div>
                        <div className='row formAdmin'>
                            <label className='col-md-2' for='inputName'>
                                Pages
							</label>
                            <div className='col-md-5'>
                                <select
                                    className='mdb-select md-form colorful-select dropdown-primary selectBoxes'
                                    onChange={this.handleSelectPages}
                                >
                                    <option name="default" value="">Select the Value</option>
                                    <option name='basic' value="1">
                                        Page 1
									</option>
                                    <option name='basic' value="2">
                                        Page 2
									</option>
                                    <option name='basic' value="3">
                                        Page 3
									</option>
                                    <option name='basic' value="4">
                                        Page 4
									</option>
                                    <option name='basic' value="5">
                                        Page 5
									</option>
                                    <option name='basic' value="6">
                                        Page 6
									</option>
                                    <option name='basic' value="7">
                                        Page 7
									</option>
                                    <option name='basic' value="8">
                                        Page 8
									</option>
                                    <option name='basic' value="9">
                                        Page 9
									</option>
                                    <option name='basic' value="10">
                                        Page 10
									</option>
                                    <option name='basic' value="11">
                                        Page 11
									</option>
                                    <option name='basic' value="12">
                                        Page 12
									</option>
                                    <option name='basic' value="13">
                                        Page 13
									</option>
                                    <option name='basic' value="14">
                                        Page 14
									</option>
                                    <option name='basic' value="15">
                                        Page 15
									</option>
                                    <option name='basic' value="16">
                                        Page 16
									</option>
                                    <option name='basic' value="17">
                                        Page 17
									</option>
                                    <option name='basic' value="18">
                                        Page 18
									</option>
                                    <option name='basic' value="19">
                                        Page 19
									</option>
                                    <option name='basic' value="20">
                                        Page 20
									</option>
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
            </div>
        );
    }
}
export default TheoryDetail;