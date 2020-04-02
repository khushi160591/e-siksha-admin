import React , {Component} from 'react';
import './Listsubtopic.css';
import Table from 'react-bootstrap/Table';

class Listsubtopic extends Component{
    render(){
        return(
            <div>
             <div className="container">
                <div className="col-md-12 adminRight">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                       
                        <th>ID</th>
                        <th>Name</th>
                        <th>SubTopic Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>1</td>

                        <td>Html</td>
                        <td>Css</td>
                        </tr>
                        <tr>
                        <td>2</td>
                        
                        <td>Thornton</td>
                        <td>Html</td>
                        </tr>
                        <tr>
                        <td>3</td>
                        <td>Larry the Bird</td>
                        <td>Html</td>
                        </tr>
                        <tr>
                        <td>4</td>
                        <td>Larry the Bird</td>
                        <td>Html</td>
                        </tr>
                        <tr>
                        <td>5</td>
                        <td>Larry the Bird</td>
                        <td>Html</td>
                        
                        </tr>
                    </tbody>
                    </Table>
                  
                </div>
                </div>


            </div>
        );
    }
}


export default Listsubtopic;