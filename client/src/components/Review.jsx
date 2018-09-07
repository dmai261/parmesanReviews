import React from 'react';

class Review extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const state = this.props.getState();
    const { reviews } = state;
    return (
      <React.Fragment>
        <h3>{JSON.stringify(reviews[0])}</h3>
      </React.Fragment>
    );
  }
}

export default Review;
