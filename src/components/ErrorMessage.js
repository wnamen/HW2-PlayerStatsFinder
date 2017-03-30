import React, { Component } from 'react';
import './App.css';

class ErrorMessage extends Component {
  render = () => {
    return (
      <div className="error-message-container">
        <h1>Gamertag Not Found</h1>
      </div>
    );
  }
}

export default ErrorMessage;
