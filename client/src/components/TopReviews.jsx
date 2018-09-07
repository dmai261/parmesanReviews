import React from 'react';
import Review from './Review.jsx';
// import style from '../styles/main.css'; // TBD get modular css working

class TopReviews extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    // };
  }
  render() {
    return (
      <React.Fragment>
        <h3>Top customer reviews</h3>
        <Review />
        <Review />
        <Review />
        <Review />
      </React.Fragment>
    );
  }
}

export default TopReviews;
