const Auth = {
    get(item) {
      const user = JSON.parse(localStorage.getItem("user"));
      return user[item];
    },
  
    isLoggedIn() {
      let response;
      if (localStorage.getItem("user")) {
        response = true;
      } else {
        response = false;
      }
      return response;
    },

    logout(){
      localStorage.removeItem("user")
    },
    clear(){
      localStorage.clear()
    }
  };
  
  export default Auth;
  