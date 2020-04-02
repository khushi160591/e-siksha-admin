import React, { Component } from 'react';
import './App.css';
// import Dashboard from './Dashboard/Dashboard';
import AppRoutes from './Router/Routing';

class App extends Component {
  render() {
    return (
      <div className="App">
      <AppRoutes />
      </div>
    );
  }
}

export default App;
