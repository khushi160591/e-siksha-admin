import React , {Component} from 'react';
import './Listtopic.css';
import Table from 'react-bootstrap/Table';
class Listtopic extends Component{

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
                
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>1</td>
                       
                        <td>Otto</td>
                       
                        </tr>
                        <tr>
                        <td>2</td>
                        
                        <td>Thornton</td>
                       
                        </tr>
                        <tr>
                        <td>3</td>
                        <td>Larry the Bird</td>
                        
                        </tr>
                        <tr>
                        <td>4</td>
                        <td>Larry the Bird</td>
                        
                        </tr>
                        <tr>
                        <td>5</td>
                        <td>Larry the Bird</td>
                        
                        </tr>
                    </tbody>
                    </Table>
                  
                </div>
                </div>
     </div>           
        );
    }
}

export default Listtopic;