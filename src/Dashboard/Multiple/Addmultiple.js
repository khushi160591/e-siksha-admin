import React , {Component} from 'react';
import './Addmultiple.css';
import { IoMdAdd } from "react-icons/io";

class Addmultiple extends Component{
    constructor(props) {
        super(props);
        this.state = {
            attributeForm: [],
            count:0,
            options : []
        };
        this.addAttributeForm();
    }
    addAttributeForm() {
        //this method adds label and input field to the state array 

        var array = this.state.attributeForm;
        const optionId = ++this.state.count;
        const optionStr = " option " +  optionId;
        var option = {
            optionId : optionId,
            optionStr : optionStr,
            value:''
        }

        this.state.options.push(option);
        array.push(<div>
            <div className="box">
    <h4><strong>{optionStr}</strong></h4>
                      
                <div className="row formAdmin">
                    <label className="col-md-1" for="descriptionText">Value</label>
                    <div className="col-md-5">
                        <textarea class="form-control formText" id="descriptionText"> 
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
                    <label className="col-md-1" for="inputName">Name</label>
                    <div className="col-md-5">
                <select className="mdb-select md-form colorful-select dropdown-primary selectBox">
                <option selected>Open this select menu</option>
                <option value="1">Html</option>
                <option value="2">Css</option>
                <option value="3">Java</option>
                <option value="3">JS</option>
                </select>
                </div>
                </div>
              
             <div className="row formAdmin">
                 <div className="col-md-7"></div>
             <div className="col-md-5">
              <button type="button" onClick={this.addAttributeForm.bind(this)}  className="btn btn-success btn-lg btnAdd">ADD <IoMdAdd /> </button>
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
                <select className="mdb-select md-form colorful-select dropdown-primary selectBox">
                {this.state.options.map(option =>
                    <option key={option.optionId} value={option.optionId}>{option.optionStr}</option>
                    )};
                </select>
                </div>
                </div>
                <div className="row formAdmin">
                    <div className="col-md-3"></div>
                    <div className="col-md-5">
                    <button type="button" className="btn btn-primary btn-lg btn-block" data-toggle="button" aria-pressed="false" autocomplete="off">Submit</button>
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