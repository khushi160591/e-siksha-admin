import React , {Component} from 'react';
import Auth from '../helper/auth';
const BASE_URL=process.env.REACT_APP_BASE_URL

const Dashboardservice = {
    addTopic,
    addMenu,
    addSubtopicTopic,
    addTheory,
    addMultiple,
    getMenuList,
    getTopicList,
    getSubtopicList,
    getTheoryList,
    login,
    addSolutionQues,
    getQuestions,
    addCompilerMode,
    addQuestion,
    updateQuestionStatus
};

function updateQuestionStatus(data){
    const updateStatusUrl = BASE_URL + "/api/siksha/interview/update/question/status"
    return fetch(updateStatusUrl ,{
        method : 'POST',
        headers: { 'Content-Type': 'application/json',
                   'Authorization': Auth.get('accessToken') },
        body :  JSON.stringify(data)
    }).then(handleResponse);
   }
function addQuestion(data){
    const addQuestionUrl = BASE_URL + "/api/siksha/admin/question/addOrUpdate"
    return fetch(addQuestionUrl ,{
        method : 'POST',
        headers: { 'Content-Type': 'application/json',
        'Authorization' : Auth.get('accessToken') },
        body :  JSON.stringify(data)
    }).then(handleResponse);
   }


function getQuestions(query) {

    const thQueUrl = BASE_URL+"/api/siksha/interview/get/questions"+query
  
    return fetch(thQueUrl, { 
      method: 'GET',
      headers: { 'Content-Type': 'application/json',
          'Authorization': Auth.get('accessToken') }
    }).then(handleResponse);
  }

  function addCompilerMode(data){
    const addCompilerModeUrl = BASE_URL + "/api/compiler/mode"
    return fetch(addCompilerModeUrl ,{
        method : 'POST',
        headers: { 'Content-Type': 'application/json',
        'Authorization' : Auth.get('accessToken') },
        body :  JSON.stringify(data)
    }).then(handleResponse);
   }
  
function addSolutionQues(data){
    const getSolutionQuesUrl = BASE_URL + "/api/siksha/admin/solution/addOrUpdate"
    return fetch(getSolutionQuesUrl ,{
        method : 'POST',
        headers: { 'Content-Type': 'application/json',
        'Authorization' : Auth.get('accessToken') },
        body :  JSON.stringify(data)
    }).then(handleResponse);
   }
function login(data){
    const loginUrl = BASE_URL + "/api/user/auth/signin"
    return fetch(loginUrl ,{
        method : 'POST',
        headers: { 'Content-Type': 'application/json'},
        body :  JSON.stringify(data)
    }).then(handleResponse);
   }
   function getTopicList(){
    const gettopiclist = BASE_URL + "/api/siksha/admin/get/topic/list" 
    return fetch(gettopiclist ,{
        method : 'GET',
        headers: { 'Content-Type': 'application/json',
        'Authorization' : Auth.get('accessToken') },
        }).then(handleResponse);
   }

   function getMenuList(){
    const getmenulist = BASE_URL + "/api/siksha/admin/menu/list" 
    return fetch(getmenulist ,{
        method : 'GET',
        headers: { 'Content-Type': 'application/json',
        'Authorization' : Auth.get('accessToken') },
        }).then(handleResponse);
   }
   function getSubtopicList(query){
       const getsubtopiclist = BASE_URL + "/api/siksha/admin/get/subtopic"+query
       return fetch (getsubtopiclist ,{
           method : 'GET',
           headers: { 'Content-Type': 'application/json',
           'Authorization' : Auth.get('accessToken') },
       }).then(handleResponse);
   }
   function getTheoryList(){
    const gettheorylist = BASE_URL + "/api/siksha/admin/get/theory/list"
    return fetch (gettheorylist ,{
        method : 'GET',
        headers: { 'Content-Type': 'application/json',
        'Authorization' : Auth.get('accessToken') },
    }).then(handleResponse);
}

   function addMenu(data){
    console.log(process.env.BASE_URL)
    const addmenuUrl = BASE_URL + "/api/siksha/admin/menu/addOrUpdate"
    return fetch(addmenuUrl ,{
        method : 'POST',
        headers: { 'Content-Type': 'application/json',
        'Authorization' : Auth.get('accessToken') },       
         body :  JSON.stringify(data)
        }).then(handleResponse);
   }
 

  
   function addTopic(data){
    console.log(process.env.BASE_URL)
    const addtopicUrl = BASE_URL + "/api/siksha/admin/topic/addOrUpdate"
    return fetch(addtopicUrl ,{
        method : 'POST',
        headers: { 'Content-Type': 'application/json',
         'Authorization' : Auth.get('accessToken') },
        body : JSON.stringify (data)
        }).then(handleResponse);
   }

   
   function addSubtopicTopic(data){
    const addsubtopictopicUrl = BASE_URL + "/api/siksha/admin/subtopic/add"
    return fetch(addsubtopictopicUrl ,{
        method : 'POST',
        headers: { 'Content-Type': 'application/json',
        'Authorization' : Auth.get('accessToken') },
        body :  JSON.stringify(data)
        }).then(handleResponse);
    }

   function addTheory(data){
    const addtheoryUrl = BASE_URL + "/api/siksha/admin/theortical/add"
    return fetch(addtheoryUrl ,{
        method : 'POST',
        headers: { 'Content-Type': 'application/json',
         'Authorization' : Auth.get('accessToken') },
        body :  JSON.stringify(data)
        }).then(handleResponse);
    }

   function addMultiple(data){
    const addmultipleUrl = BASE_URL +"/api/siksha/admin/multiple/add"
    return fetch(addmultipleUrl ,{
        method : 'POST',
        headers: { 'Content-Type': 'application/json',
         'Authorization' : Auth.get('accessToken') },
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
