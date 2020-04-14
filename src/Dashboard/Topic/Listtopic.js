import React , {Component} from 'react';
import './Listtopic.css';
import Table from 'react-bootstrap/Table';
import Dashboardservice from '../../Service/Dashboardservice';

class Listtopic extends Component{
    constructor(props){
        super(props);
        this.state = {
            topicList:[]
        }
    }
  
    componentDidMount() {
      this.getTopic();
    }
    getTopic(){
         Dashboardservice.getTopicList()
         .then(res => {
          if (res.statusInfo.statusCode === 200) {
            this.setState({
                topicList : res.responseData
            })
          }
        })
        .catch(error => {
          console.log("error message: ", error);
         alert("error is getting..")
        });
         
        }  
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
                       {this.state.topicList.map((topic , index) => {
                           return(
                               <tr key = {topic.id}>
                                <td>{topic.id}</td>
                                  <td>{topic.name}</td>
                               </tr>
                           )
                       }
                       )}
                    </tbody>
                    </Table>
                  
                </div>
                </div>
     </div>           
        );
    }
}

export default Listtopic;