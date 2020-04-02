import React , {Component} from 'react';

const BASE_URL="http://localhost:9090"

const Dashboardservice = {
    addTopic,
    addMenu,
    addsubtopicTopic,
    addTheory,
    addMultiple,
    mapTopic
};
 
   function addMenu(data){
    console.log(process.env.BASE_URL)
    const addmenuUrl = BASE_URL + "/admin/menu/addOrUpdate"
    return fetch(addmenuUrl ,{
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body :  JSON.stringify(data)
        }).then(handleResponse);
   }
 

  
   function addTopic(data){
    const addtopicUrl = BASE_URL 
    return fetch(addtopicUrl ,{
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body : JSON.stringify (data)
        }).then(handleResponse);
   }

   
   function addsubtopicTopic(data){
    const addsubtopictopicUrl = BASE_URL 
    return fetch(addsubtopictopicUrl ,{
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body :  JSON.stringify(data)
        }).then(handleResponse);
    }

   function addTheory(name , code ,description){
    const addtheoryUrl = BASE_URL
    return fetch(addtheoryUrl ,{
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body :  JSON.stringify({
             name : name,
             code : code,
             description : description
        })
    }).then(handleResponse);
   }

   function addMultiple(name , code ,description){
    const addmultipleUrl = BASE_URL 
    return fetch(addmultipleUrl ,{
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body :  JSON.stringify ({
             name : name,
             code : code,
             description : description
        })
    }).then(handleResponse);
   }

   function mapTopic(menuId ,topicId ){
    const maptopicUrl = BASE_URL 
    return fetch(maptopicUrl ,{
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body :  JSON.stringify({
            menuId : menuId,
            topicId : topicId
        })
    }).then(handleResponse);
   }



   function handleResponse(response) {
    return response.text().then(text => {
      const data = text && JSON.parse(text);
      return data;
    });
  }
  

export default Dashboardservice;