import React from 'react';
import Review from './Review.jsx';

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
        <Review getState={this.props.getState} />
      </React.Fragment>
    );
  }
}

export default TopReviews;
