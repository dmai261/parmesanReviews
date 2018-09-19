import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

class Client {
  constructor() {
    this.domElement = document.querySelector('.Reviews') || document.querySelector('#Reviews');
    this.init();
  }

  init() {
    if (this.domElement) {
      // ReactDOM.render(<App />, this.domElement);
    }
  }
}

const client = new Client();
window.Reviews = App;

export default client;
