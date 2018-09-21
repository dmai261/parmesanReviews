import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

class Client {
  constructor() {
    // TBD turn this on to see individual component
    this.renderingToDOM = true;
    this.host = `http://localhost:1337`;
    this.domElement = document.querySelector('#Reviews');
    this.init();
  }

  init() {
    if (this.renderingToDOM) {
      ReactDOM.render(<App host={this.host} />, this.domElement);
    } else {
      window.Reviews = App;
    }
  }
}

const client = new Client();

export default client;
