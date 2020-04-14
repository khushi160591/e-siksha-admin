import React , {Component} from 'react';
import './Addtheory.css';
import { IoMdAdd } from "react-icons/io";
import Dashboardservice from '../../Service/Dashboardservice';

class Addtheory extends Component{
    constructor(props) {
        super(props);
        this.state = {
            attributeTheory: [],
            count:0, 
            topicList : [],
            selectedTopic:{},
            selectedSubtopic :{}, /**Create empty as for dynamic insertion Object** */
            subTopicList : [],/****Empty array of object ***/
            topicId:0 ,
            questionList:[],
            description: '',
            answer : '',
            type: '',
            subTopicMap :new Map()

        };
        this.handleTopicSelect = this.handleTopicSelect.bind(this);
        this.handleSelect=this.handleSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleEvent = this.handleEvent.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addAttributeTheory();
    }

   
    handleEvent = () =>{
        this.handleAdd();
        this.addAttributeTheory();
    }
    
     handleChange = e =>{
        this.setState({
            [e.target.id]: e.target.value /***generic call for achieve target on input or textarea  */
        })
    
     }

     handleSelect = e =>{
       this.setState({
           type: e.target.value
       })
    
     }
 
     handleAdd = ()=>{
        /***Create array of object to store as pass in api**** */
        /**************************************************** */
               var  theoryList = {
                   description : this.state.description,
                   answer :this.state.answer,
                   type:this.state.type
               }
               this.state.questionList.push(theoryList);
           }
          
           handleSubtopicSelect = event =>{
                const  subtId = parseInt(event.target.value);
                const subtopic = {
                    id : subtId,
                    name : this.state.subTopicMap.get(subtId)
                }
                this.setState({
                    selectedSubtopic: subtopic
                })
        }

        /**********this method for event trigger whhile select on topic ,subtopiclist should change *****/
        handleTopicSelect =event => { 
            
             const topicID = parseInt(event.target.value) /***getting value as string convert to integer and pass PARAMETER inside subtopic api method */
             this.getSubtopicList(topicID)
        }
        componentDidMount() {
            this.getTopic();
          }
          
          getSubtopicList(id){
             const query = "?topicId=" + id /**query for pass url as topicid */
            Dashboardservice.getSubtopicList(query)
            .then(res => {
             if (res.statusInfo.statusCode === 200) {
                var map = new Map()
                res.responseData.subTopics.forEach(subtopic => {
                    map.set(subtopic.id,subtopic.name)

                });
                const subtopic = {
                    id:res.responseData.subTopics[0].id,
                    name:res.responseData.subTopics[0].name
                }
               
                /***get response based on api pass on backeend */
               this.setState({
                subTopicList : res.responseData.subTopics ,
                selectedSubtopic:subtopic,
                subTopicMap:map

               })
 
             }
           })
           .catch(error => {
             console.log("error message: ", error);
            alert("error is getting..")
           });
            
         }  

        
          getTopic(){
            Dashboardservice.getTopicList()
            .then(res => {
             if (res.statusInfo.statusCode === 200) {
 
            this.getSubtopicList(res.responseData[0].id);    /************subtopic api will get response through  id and change based on topiclist id */

               this.setState({
                  topicList : res.responseData /*******based on topicList response subtopic list should change */
               })
 
             }
           })
           .catch(error => {
             console.log("error message: ", error);
            alert("error is getting..")
           });
            
         }  

    
         handleSubmit = (e)=>{
            e.preventDefault();

          console.log("handle request ");
          const data = {
            description : this.state.description,
            answer :this.state.answer,
            type:this.state.type
          }
          this.state.questionList.push(data);

           /****api pass respective value as we are creating in ui as array of object before add api*/
           const obj = {  
            subTopicId : this.state.selectedSubtopic.id,
            subTopicName : this.state.selectedSubtopic.name,
            theoryQuestions :this.state.questionList
          }
          Dashboardservice.addTheory(obj)
          .then(res => {
              if (res.statusInfo.statusCode === 200) {
                alert("successful....")
              }
            })
            .catch(error => {
              console.log("error message: ", error);
             alert("error is getting..")
            });
      }

          
        

    addAttributeTheory() {
        //this method adds label and input field to the state array 

        var array = this.state.attributeTheory;

        array.push(<div>
            <div className="box">
              <h4><strong>Questions {++this.state.count}</strong></h4>
            <div className="row formAdmin">
                    <label className="col-md-2" for="inputName">Type</label>
                    <div className="col-md-5">
                    <select className="mdb-select md-form colorful-select dropdown-primary selectBox" 
                        onChange = {this.handleSelect} >   
                    <option name = "default" value = "">Select the Value</option>
                    <option name = "basic" value = "BASIC">Basic</option>
                    <option name = "advanced" value = "ADVANCED">Advanced</option>

                                      
                </select>
                </div>
                </div>
                       <div className="row formAdmin">
                    <label className="col-md-2" for="description">Question Description</label>
                    <div className="col-md-5">
                        <input type="text" className="form-control formText" id="description" placeholder="Description" onChange={this.handleChange} />
                        </div>
                </div>
                <div className="row formAdmin">
                    <label className="col-md-2" for="answer">Answer</label>
                    <div className="col-md-5">
                        <textarea class="form-control formText" id="answer" onChange={this.handleChange}> 
                        </textarea>
                        </div>
                </div>
                 
              
                </div>
                   </div>
        );

        this.setState({
            attributeTheory: array
        });
    }
    render(){
        
        return(
            <div>
           <div className="container">
                <div className="col-md-12 adminRight">
               
                    <form role="form">
                <div className="row formAdmin">
                    <label className="col-md-2" for="inputName">TopicName</label>
                    <div className="col-md-5">
                    <select className="mdb-select md-form colorful-select dropdown-primary selectBox" 
                onChange = {this.handleTopicSelect} >
                 {this.state.topicList.map((topic,index) => {
                     return (
                     <option name = {topic.id} value = {topic.id}>{topic.name}</option>
                     )
                 }
                 )}
                </select>
                </div>
                </div>

                 <div className="row formAdmin">
                    <label className="col-md-2" for="inputName">Subtopic</label>
                    <div className="col-md-5">
                    <select className="mdb-select md-form colorful-select dropdown-primary selectBox" 
                onChange = {this.handleSubtopicSelect} >
                 {this.state.subTopicList.map((subtopic,index) => {
                     return (
                     <option name = {subtopic.id} value = {subtopic.id}>{subtopic.name}</option>
                     )
                 }
                 )}
                </select>
                </div>
                </div>
              
             <div className="row formAdmin">
                 <div className="col-md-7"></div>
             <div className="col-md-5">
             <button type="button" onClick={this.handleEvent.bind(this)}  className="btn btn-success btn-lg btnAdd">ADD <IoMdAdd /> </button>
              </div>
              </div>
              { 
                this.state.attributeTheory.map(input => {
                    return input
                })
              }
                <div className="row formAdmin">
                    <div className="col-md-3"></div>
                    <div className="col-md-5">
                    <button  className="btn btn-primary btn-lg btn-block" onClick = {this.handleSubmit.bind(this)}>Submit</button>
                    </div>
                </div>

                
                </form>
                </div>
                </div>

            </div>
        );
    }
}


export default Addtheory;