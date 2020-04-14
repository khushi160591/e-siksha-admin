import React , {Component} from 'react';
import './Addmultiple.css';
import { IoMdAdd } from "react-icons/io";
import Dashboardservice from '../../Service/Dashboardservice';


class Addmultiple extends Component{
    constructor(props) {
        super(props);
        this.state = {
            attributeForm: [],
            count:0,
            dropDownOptions : [],
            options:[],
            topicList:[],
            subtopicList:[],
            description:'',
            answerId:0,
            option:{},
            subtopicId:0,
            type:''
            
        };
        this.handleAdd = this.handleAdd.bind(this);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleTypeSelect=this.handleTypeSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTopicSelect = this.handleTopicSelect.bind(this);
        this.handleSubtopicSelect = this.handleSubtopicSelect.bind(this);
        this.handleSelect=this.handleSelect.bind(this);
        this.getTopic = this.getTopic.bind(this)
        this.handleEvent = this.handleEvent.bind(this);

        this.addAttributeForm();
    }

    handleTopicSelect =event => { 
            
        const topicID = parseInt(event.target.value) /***getting value as string convert to integer and pass PARAMETER inside subtopic api method */
        this.getSubtopicList(topicID)
   }

    
   handleTypeSelect =event => { 
            
    this.state.type = event.target.value /***getting value as string convert to integer and pass PARAMETER inside subtopic api method */
  }

   handleEvent = () =>{
    this.handleAdd();
    this.addAttributeForm();
   }

    handleAdd = ()=>{
               
               this.state.options.push(this.state.option);
     }
         
     handleSelect = e =>{
        this.setState({
            answerId: parseInt(e.target.value)
        })
     
      }
  
    handleSubtopicSelect = event =>{
        this.state.subtopicId= parseInt(event.target.value);
                
    }
    handleValueChange = e =>{
        
        this.state.option = {
            optionId:parseInt(e.target.id),
            value:e.target.value
        }
    
     }

     handleChange = e =>{
        
        this.setState({[e.target.id]:e.target.value})
    
     }


    handleSubmit = (e)=>{  
        e.preventDefault();

      console.log("handle request ");
      
      this.state.options.push(this.state.option);

       /****api pass respective value as we are creating in ui as array of object before add api*/
       const obj = {  
        subTopicId : this.state.subtopicId,
        description : this.state.description,
        options: this.state.options,
        answerId:  this.state.answerId,
        type: this.state.type

      }
      Dashboardservice.addMultiple(obj)
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
    componentDidMount() {
        this.getTopic();
      }
      
      getSubtopicList(id){
         const query = "?topicId=" + id /**query for pass url as topicid */
        Dashboardservice.getSubtopicList(query)
        .then(res => {
         if (res.statusInfo.statusCode === 200) {           
            /***get response based on api pass on backeend */
           this.setState({
            subtopicList : res.responseData.subTopics,
            subtopicId:  res.responseData.subTopics[0].id

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

   

    addAttributeForm() {
        //this method adds label and input field to the state array 

        var array = this.state.attributeForm;
        const optionId = ++this.state.count;
        const optionStr = " option " +  optionId;
        var opt = {
            optionId : optionId,
            optionStr : optionStr,
            value:''
        }

        this.state.dropDownOptions.push(opt);
        array.push(<div>
            <div className="box">
    <h4><strong>{optionStr}</strong></h4>
                      
                <div className="row formAdmin">
                    <label className="col-md-1" for="descriptionText">Value</label>
                    <div className="col-md-5">
                        <textarea class="form-control formText" id={optionId} onChange={this.handleValueChange}> 
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
                 {this.state.subtopicList.map((subtopic,index) => {
                     return (
                     <option name = {subtopic.id} value = {subtopic.id}>{subtopic.name}</option>
                     )
                 }
                 )}
                </select>
                </div>
                </div>

                <div className="row formAdmin">
                    <label className="col-md-1" for="description">Question</label>
                    <div className="col-md-5">
                        <textarea class="form-control formText" id="description" onChange={this.handleChange} > 
                        </textarea>
                        </div>

                        <select className="mdb-select md-form colorful-select dropdown-primary selectBox" 
                        onChange = {this.handleTypeSelect} >   
                            <option name = "default" value = "">Select the Value</option>
                            <option name = "basic" value = "BASIC">Basic</option>
                            <option name = "advanced" value = "ADVANCED">Advanced</option>

                                            
                        </select>
                      
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
                    <label className="col-md-1" for="inputName">Answer</label>
                    <div className="col-md-5">
                <select className="mdb-select md-form colorful-select dropdown-primary selectBox"   onChange= {this.handleSelect}>
                 <option key="default">Select Option</option>
                {this.state.dropDownOptions.map(option =>
                    <option key={option.optionId} value={option.optionId}>{option.optionStr}</option>
                    )};
                </select>
                </div>
                </div>
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

export default Addmultiple;