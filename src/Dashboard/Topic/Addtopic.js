import React , {Component} from 'react';
import './Addtopic.css';

class Addtopic extends Component{
      constructor(props){
          super(props);
          this.state = {
              name : '',
              code : '',
              description : ''
          }
        }
          handleChange = event =>{
            this.setState({ 
                [event.target.id] :event.target.value 
            })
            }
            handleSubmit = event =>{
                event.preventDefault();
                
      }

    
    render(){
        const data = { name:this.state.name, code:this.state.code ,description : this.state.description }

        return(
           <div>
   
                <div className="container">
                <div className="col-md-12 adminRight">

                    <form role="form">
                <div className="row formAdmin">
                    <label className="col-md-2" for="name">Name : </label>
                    <div className="col-md-5">
                        <input type="text" class="form-control formText" id="name" placeholder="Name"  onChange={this.handleChange}/>
                        </div>
                </div>
                <div className="row formAdmin">
                    <label className="col-md-2" for="code">Code : </label>
                    <div className="col-md-5">
                        <input type="text" className="form-control formText" id="code" placeholder="Code" onChange={this.handleChange}/>
                        </div>
                </div>
                <div className="row formAdmin">
                    <label className="col-md-2" for="description">Topic Description : </label>
                    <div className="col-md-5">
                        <textarea class="form-control formText" id="description" onChange={this.handleChange}> 
                        </textarea>
                        </div>
                </div>
                <div className="row formAdmin">
                    <div className="col-md-2"></div>
                    <div className="col-md-5">
                    <button type="button" class="btn btn-primary btn-lg btn-block" data-toggle="button" aria-pressed="false" autocomplete="off" 
                    onSubmit = {this.handleSubmit}>
                        Submit</button>
                    </div>
                </div>
                </form>
                </div>
                </div>
                </div>
        );
    }
}

export default Addtopic;