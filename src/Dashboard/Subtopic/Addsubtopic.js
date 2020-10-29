import React , {Component} from 'react';
import './Addsubtopic.css';
import { IoMdAdd } from "react-icons/io";
import Dashboardservice from '../../Service/Dashboardservice';
import Dashboard from '../Dashboard';
import styled from 'styled-components';
const Active = styled.div`
.row {
    height:45px;
}
`;


class Addsubtopic extends Component{
    constructor(props) {
        super(props);
        this.state = {
            attributeForm: [],
            count:0,
            topicList : [],
            topicListMap:new Map(), /****Map called for passing key and value as id and name */
            selectedTopic:{}, /**Create empty as for dynamic insertion Object** */
            subTopicList : [],/****Empty array of object ***/
            name:'',   
            description:''
            
        };

        this.handleSelect=this.handleSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleEvent = this.handleEvent.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addAttributeForm ();

    }

    
    handleEvent = () =>{
        this.handleAdd();
        this.addAttributeForm();
    }
    
    
    
     handleChange = e =>{
        this.setState({
            [e.target.id]: e.target.value /***generic call for achieve target on input or textarea  */
        })
    
     }
 

    handleAdd = ()=>{
 /***Create array of object to store as pass in api**** */
 /**************************************************** */
        var subtopic ={
            name:this.state.name,
            description:this.state.description
        }

       this.state.subTopicList.push(subtopic) /**Insert object into empty array of object using push*/
       
    }
   

    handleSelect = event =>{
        const tId = event.target.value;
        const topic = {
            id:tId,
            name:this.state.topicListMap.get(tId)
        }
        this.setState({
            selectedTopic:topic
        })
    }

    componentDidMount() {
        this.getTopic();    
      
      }

      getTopic(){
           Dashboardservice.getTopicList()
           .then(res => {
            if (res.statusInfo.statusCode === 200) {

                var map = new Map()
                res.responseData.forEach(topic => {
                    map.set(topic.id,topic.name)

                });
                const topic = {
                    id:res.responseData[0].id,
                    name:res.responseData[0].name
                }
              this.setState({
                  topicList : res.responseData,
                  topicListMap: map,
                  selectedTopic:topic
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
                name:this.state.name,
                description:this.state.description
              }
              this.state.subTopicList.push(data);

           /****api pass respective value as we are creating in ui as array of object before add api*/
              const obj = {  
                topicId : this.state.selectedTopic.id,
                topicName : this.state.selectedTopic.name,
                subTopics :this.state.subTopicList
              }

              Dashboardservice.addSubtopicTopic(obj)
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

        
    addAttributeForm() {
        //this method adds label and input field to the state array 

        var array = this.state.attributeForm;
      
        array.push(<div>
            <div className="box">
                <h4><strong>Subtopic {++this.state.count}</strong></h4>
                       <div className="row formAdmin">
                    <label className="col-md-1" for="inputCode">Name</label>
                    <div className="col-md-5">
                        <input type="text" className="form-control formText" id="name" placeholder="name" onChange={this.handleChange}/>
                        </div>
                </div>
                <div className="row formAdmin">
                    <label className="col-md-1" for="descriptionText">Description</label>
                    <div className="col-md-5">
                        <textarea class="form-control formText" id="description" onChange={this.handleChange}> 
                        </textarea>
                        </div>
                </div>
                </div>
                   </div>
        );

        this.setState({
            attributeForm: array
        });
    }

   
    render(){
         
        return(
            <div>
                <Active>
           <div className="container">
                <div className="col-md-12 adminRight">
                <Dashboard></Dashboard>
                <h3><strong>TOPIC</strong></h3>

                    <form role="form">
                <div className="row formAdmin">
                    <label className="col-md-1" for="inputName">TopicName</label>
                    <div className="col-md-5">
                <select className="mdb-select md-form colorful-select dropdown-primary selectBox" 
                onChange = {this.handleSelect} >
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
                 <div className="col-md-7"></div>
             <div className="col-md-5">
              <button type="button" onClick={this.handleEvent.bind(this)}  className="btn btn-success btn-lg btnAdd">ADD <IoMdAdd /> </button>
              </div>
              </div>
              { 
                this.state.attributeForm.map(input => {
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
                </Active>
            </div>
        );
    }
}


export default Addsubtopic;