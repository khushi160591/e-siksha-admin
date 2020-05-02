import React , {Component} from 'react';

const BASE_URL=process.env.BASE_URL

const Dashboardservice = {
    addTopic,
    addMenu,
    addSubtopicTopic,
    addTheory,
    addMultiple,
    getMenuList,
    getTopicList,
    getSubtopicList,
    getTheoryList
    
    

};
  
  
   function getTopicList(){
    const gettopiclist = BASE_URL + "/api/admin/get/topic/list" 
    return fetch(gettopiclist ,{
        method : 'GET'
        }).then(handleResponse);
   }

   function getMenuList(){
    const getmenulist = BASE_URL + "/api/admin/menu/list" 
    return fetch(getmenulist ,{
        method : 'GET'
        }).then(handleResponse);
   }
   function getSubtopicList(query){
       const getsubtopiclist = BASE_URL + "/api/admin/get/subtopic" + query
       return fetch (getsubtopiclist ,{
           method : 'GET'
       }).then(handleResponse);
   }
   function getTheoryList(){
    const gettheorylist = BASE_URL + "/api/admin/get/theory/list"
    return fetch (gettheorylist ,{
        method : 'GET'
    }).then(handleResponse);
}

   function addMenu(data){
    console.log(process.env.BASE_URL)
    const addmenuUrl = BASE_URL + "/api/admin/menu/addOrUpdate"
    return fetch(addmenuUrl ,{
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body :  JSON.stringify(data)
        }).then(handleResponse);
   }
 

  
   function addTopic(data){
    const addtopicUrl = BASE_URL + "/api/admin/topic/addOrUpdate"
    return fetch(addtopicUrl ,{
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body : JSON.stringify (data)
        }).then(handleResponse);
   }

   
   function addSubtopicTopic(data){
    const addsubtopictopicUrl = BASE_URL + "/api/admin/subtopic/add"
    return fetch(addsubtopictopicUrl ,{
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body :  JSON.stringify(data)
        }).then(handleResponse);
    }

   function addTheory(data){
    const addtheoryUrl = BASE_URL + "/api/admin/theortical/add"
    return fetch(addtheoryUrl ,{
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body :  JSON.stringify(data)
        }).then(handleResponse);
    }

   function addMultiple(data){
    const addmultipleUrl = BASE_URL +"/api/admin/multiple/add"
    return fetch(addmultipleUrl ,{
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body :  JSON.stringify(data)
    }).then(handleResponse);
   }

  


   function handleResponse(response) {
    return response.text().then(text => {
      const data = text && JSON.parse(text);
      return data;
    });
  }
  

export default Dashboardservice;