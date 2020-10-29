import React , {Component} from 'react';
import './Addmenu.css';
import Dashboardservice from '../../Service/Dashboardservice';
import Dashboard from '../Dashboard';
import styled from 'styled-components';

const Active = styled.div`
.row {
    height:65px;
}
`;
class Addmenu extends Component{

   constructor(props){
       super(props);
       this.state = {
        name : '',
        code : '',
        description : ''
       };
       this.handleChange = this.handleChange.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleChange = event =>{
        this.setState({ 
        [event.target.id]:event.target.value 
    })
    }
    handleSubmit = (event)=>{
        event.preventDefault();
        const data = { 
            name:this.state.name,
            code:this.state.code,
            description : this.state.description 
        }

        Dashboardservice.addMenu(data)
        .then(res => {
            if (res.statusInfo.statusCode === 200) {
              alert("successful....")
            }
          })
          .catch(error => {
            console.log("error message: ", error);
           alert("error is getting..")
          });
      };
    


    render(){

        return(
  <div>
   <Active>
                <div className="container">
                <div className="col-md-12 adminRight">
                <Dashboard></Dashboard>
                    <form role="form" onSubmit={this.handleSubmit} >
                <div className="row formAdmin">
                    <label className="col-md-1" for="inputName">Name</label>
                    <div className="col-md-5">
                        <input type="text" class="form-control formText" id="name" placeholder="Name" onChange={this.handleChange}/>
                        </div>
                </div>
                <div className="row formAdmin">
                    <label className="col-md-1" for="inputCode">Code</label>
                    <div className="col-md-5">
                        <input type="text" className="form-control formText" id="code" placeholder="Code" onChange={this.handleChange} />
                        </div>
                </div>
                <div className="row formAdmin">
                    <label className="col-md-1" for="descriptionText">Description</label>
                    <div className="col-md-5">
                        <textarea class="form-control formText" id="description" onChange={this.handleChange}> 
                        </textarea>
                        </div>
                </div>
                <div className="row formAdmin">
                    <div className="col-md-1"></div>
                    <div className="col-md-5">
                    <button  className="btn btn-primary btn-lg btn-block" >Submit</button>
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

export default Addmenu;