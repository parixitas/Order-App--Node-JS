import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

class App extends Component {

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
              Order Service
          </div>
          <div class="panel-body">
            Welcome to order micro service
          </div>
        </div>
      </div>
    );
  }
}

export default App;
