import React from 'react';
import $ from 'jquery';
import Header from './Header.jsx';
import Mentions from './Mentions.jsx';
import TopReviews from './TopReviews.jsx';
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
    // TBD refactor ajax request to fetch/promises/await
    const settings = {
      async: true,
      crossDomain: true,
      url: `${this.serverUrl}/reviews/${this.state.currentProductId}`,
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'cache-control': 'no-cache',
      },
    };

    $.ajax(settings).done((data) => {
      console.log(`A successful GET request to server returned ${data.length} review objects`);
      this.setState({ reviews: data });
    });
  }

  render() {
    const { state } = this;
    const stringState = JSON.stringify(state.reviews[0]);
    return (
      <React.Fragment>
        <div>{stringState}</div>
        <Header />
        <Mentions />
        <TopReviews />
      </React.Fragment>
    );
  }
}

export default App;
