// import App from './components/App.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

class Client {
  constructor() {
    this.domElement = document.querySelector('.App');
    this.init();
  }

  init() {
    ReactDOM.render(<App />, this.domElement);
  }
}

const client = new Client();

module.exports = Client;
