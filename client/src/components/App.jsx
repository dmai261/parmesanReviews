import React from 'react';
import $ from 'jquery';
// import style from '../styles/main.css'; // TBD get modular css working

class App extends React.Component {
  constructor(props) {
    super(props);
    this.serverUrl = 'http://localhost:1337';
    this.state = {
      reviews: [],
      currentProductId: 37,
    };
  }

  componentDidMount() {
    // TBD GET request to server for review data
    // TBD refactor ajax request to fetch
    const settings = {
      async: true,
      crossDomain: true,
      url: `${this.serverUrl}/reviews/${this.state.currentProductId}`,
      method: 'GET',
      headers: {
        content-type: 'application/json',
        cache-control: 'no-cache',
      },
    };

    $.ajax(settings).done((data) => {
      console.log('successful GET!');
      this.setState({ reviews: data });
    });
  }

  render() {
    const { state } = this;
    return (
      <div>{state.reviews}</div>
    );
  }
}

export default App;
