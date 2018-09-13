import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

class Client {
  constructor() {
    this.domElement = document.querySelector('.App');
    this.init();
  }

  init() {
    if (this.domElement) {
      ReactDOM.render(<App />, this.domElement);
    }
  }
}

const client = new Client();

module.exports = client;
