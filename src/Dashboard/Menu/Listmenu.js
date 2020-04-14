import React, { Component } from 'react';
import './Listmenu.css';
import Table from 'react-bootstrap/Table';
import Dashboardservice from '../../Service/Dashboardservice';
class Listmenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuList: []
        }
    }

    componentDidMount() {
        this.getMenu();
    }
    getMenu() {
        Dashboardservice.getMenuList()
            .then(res => {
                if (res.statusInfo.statusCode === 200) {
                    this.setState({
                        menuList: res.responseData
                    })
                }
            })
            .catch(error => {
                console.log("error message: ", error);
                alert("error is getting..")
            });

    }



    render() {
        return ( <
            div >

            <
            div className = "container" >
            <
            div className = "col-md-12 adminRight" >
            <
            Table striped bordered hover >
            <
            thead >
            <
            tr >
            <
            th > ID < /th> <
            th > Name < /th> <
            /tr> <
            /thead> <
            tbody > {
                this.state.menuList.map((menu, index) => {
                    return ( <
                        tr key = { menu.id } >
                        <
                        td > { menu.id } < /td> <
                        td > { menu.name } < /td> <
                        /tr>
                    )
                })
            }


            <
            /tbody> <
            /Table>

            <
            /div> <
            /div> <
            /div>           
        );
    }
}

export default Listmenu;