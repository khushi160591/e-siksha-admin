import React, { Component } from 'react'
import './Solutionadd.css';
import Dashboard from '../../Dashboard';
import Dashboardservice from '../../../Service/Dashboardservice';

export default class Solutionadd extends Component {
    constructor(props) {
		super(props);
		this.state = {
			subtopicList: [],
			topicList: [],
			questionLists:[],
			subtopicId: 0,
			questionId:'',
			subtopicName: '',
			topicName: '',
			isCoding: undefined,
			type: '',
			selectedSubtopic: {},
			subTopicMap: new Map(),
            questionList:[],
            solution:'',
            mainProgram:'',
            resultMatcher:'',
            lang:''
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
        this.handleSelectMatcher = this.handleSelectMatcher.bind(this);
        
    }
    
    handleSelect = (e) => {
		this.setState({
			lang: e.target.value,
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

   handleSelectMatcher = (e) => {
      
       this.setState({
            resultMatcher: e.target.value,
        });
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
            solution:this.state.solution,
            lang:this.state.lang,
            mainProgram:this.state.mainProgram,
            resultMatcher: this.state.resultMatcher
		};
		Dashboardservice.addSolution(data)
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
                        Result Matcher
                    </label>
                    <div className='col-md-5'>
                        <select
                            className='mdb-select md-form colorful-select dropdown-primary selectBoxs'
                            onChange={this.handleSelectMatcher}
                        >
                              <option name = "default" value = "">Select the Value</option>
                            <option name='StringMatcher' value="StringMatcher">
                                StringMatcher
                            </option>
                            <option name='LongMatcher' value="LongMatcher">
                                LongMatcher
                            </option>
                            <option name='IntegerMatcher' value="IntegerMatcher">
                                IntegerMatcher
                            </option>
                            <option name='DoubleMatcher' value="DoubleMatcher">
                                DoubleMatcher
                            </option>   
                             <option name='Array1DDoubleMatcher' value="Array1DDoubleMatcher">
                                Array1DDoubleMatcher
                            </option>
                            <option name='Array1DIntegerMatcher' value="Array1DIntegerMatcher">
                                Array1DIntegerMatcher
                            </option>
                            <option name='Array1DLongMatcher' value="Array1DLongMatcher">
                                Array1DLongMatcher
                            </option>
                            <option name='Array1DStringMatcher' value="Array1DStringMatcher">
                                Array1DStringMatcher
                            </option>  
                             <option name='Array1DDoubleMatcherElement' value="Array1DDoubleMatcherElement">
                                Array1DDoubleMatcherElement
                            </option>
                            <option name='Array1DIntegerMatcherElement' value="Array1DIntegerMatcherElement">
                                Array1DIntegerMatcherElement
                            </option>
                            <option name='Array1DLongMatcherElement' value="Array1DLongMatcherElement">
                                Array1DLongMatcherElement
                            </option>
                            <option name='Array1DStringMatcherElement' value="Array1DStringMatcherElement">
                                Array1DStringMatcherElement
                            </option>   
                             <option name='Array2DDoubleMatcher' value="Array2DDoubleMatcher">
                                Array2DDoubleMatcher
                            </option>
                            <option name='Array2DIntegerMatcher' value="Array2DIntegerMatcher">
                                Array2DIntegerMatcher
                            </option>
                            <option name='Array2DLongMatcher' value="Array2DLongMatcher">
                                Array2DLongMatcher
                            </option>
                            <option name='Array2DStringMatcher' value="Array2DStringMatcher">
                                Array2DStringMatcher
                            </option> 
                            <option name='Array2DDoubleMatcherElement' value="Array2DDoubleMatcherElement">
                                Array2DDoubleMatcherElement
                            </option>
                            <option name='Array2DIntegerMatcherElement' value="Array2DIntegerMatcherElement">
                                Array2DIntegerMatcherElement
                            </option> 
                            <option name='Array2DLongMatcherElement' value="Array2DLongMatcherElement">
                                Array2DLongMatcherElement
                            </option>
                            <option name='Array2DStringMatcherElement' value="Array2DStringMatcherElement">
                                Array2DStringMatcherElement
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
                        Lang
                    </label>
                    <div className='col-md-5'>
                        <select
                            className='mdb-select md-form colorful-select dropdown-primary selectBoxs'
                            onChange={this.handleSelect}
                        >
                        <option name = "default" value = "">Select the lang</option>
                            <option name='basic' value="java">
                               Java
                            </option>
                            <option name='advanced' value="python">
                                Python
                            </option>
                            <option name='advanced' value="c">
                               C
                            </option>
                            <option name='advanced' value="c++">
                                C++
                            </option>
                        </select>
                    </div>
                </div>

                <div className='row formAdmin'>
                    <label className='col-md-2' for='description'>
                        Solution
                    </label>
                    <div className='col-md-5'>
                    <textarea
                                className='form-control formText-three'
                                id='solution'
                                placeholder='Solution'
                                onChange={this.handleChange}
                            ></textarea>
                    </div>
                </div>
                <div>
                    <div className='row formAdmin'>
                        <label className='col-md-2' for='explanationAns'>
                            MainProgram
                        </label>
                        <div className='col-md-5'>
                            <textarea
                                className='form-control formText-three'
                                id='mainProgram'
                                placeholder='Description'
                                onChange={this.handleChange}
                            ></textarea>
                        </div>
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
    )
  }
}
