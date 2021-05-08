import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import React from "react";
import Webcamera from './webcam'

class App extends Component {
  render () {
    return (
      <div className="App">
        <Webcamera displaytext="Hello, Emily!"/>
      </div>
    );
  }
}

export default App;
