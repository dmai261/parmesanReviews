import React from 'react';
import Review from './Review.jsx';
import styles from '../styles/TopReviews.css';
class TopReviews extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const state = this.props.getState();
    const { reviews } = state;
    const reviewElements = reviews.map((review, index) => {
      // TBD toggle show reviews all on button press
      if (index < 5) {
        return <Review incrementHelpfulness={this.props.incrementHelpfulness} key={index} review={review} renderStarRating={this.props.renderStarRating} />;
      }
    });
    return (
      <React.Fragment>
        <h4>Top customer reviews</h4>
        {reviewElements}
        <div className={styles.container}><div className={styles.blue}><b>See all {reviews.length} reviews </b></div><img className={styles.blueArrowRight} src='https://s3-us-west-1.amazonaws.com/avh-fec-component/img/blueArrowRight.png' /><br /></div>
        <button className={styles.button}>Write a customer review</button>
      </React.Fragment>
    );
  }
}

export default TopReviews;
