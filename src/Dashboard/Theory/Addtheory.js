import React , {Component} from 'react';
import './Addtheory.css';
import { IoMdAdd } from "react-icons/io";

class Addtheory extends Component{
    constructor(props) {
        super(props);
        this.state = {
            attributeTheory: [],
            count:0
        };
        this.addAttributeTheory();
    }
    addAttributeTheory() {
        //this method adds label and input field to the state array 

        var array = this.state.attributeTheory;

        array.push(<div>
            <div className="box">
    <h4><strong>Subtopic {++this.state.count}</strong></h4>
                       <div className="row formAdmin">
                    <label className="col-md-2" for="inputCode">Answer</label>
                    <div className="col-md-5">
                        <input type="text" className="form-control formText" id="inputCode" placeholder="answer" />
                        </div>
                </div>
                <div className="row formAdmin">
                    <label className="col-md-2" for="descriptionText">Question Description</label>
                    <div className="col-md-5">
                        <textarea class="form-control formText" id="descriptionText"> 
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
                    <label className="col-md-1" for="inputName">Subtopic</label>
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
              <button type="button" onClick={this.addAttributeTheory.bind(this)}  className="btn btn-success btn-lg btnAdd">ADD <IoMdAdd /> </button>
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


export default Addtheory;