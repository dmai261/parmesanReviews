import React from 'react';
import styles from '../styles/Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    // };
  }

  render() {
    const state = this.props.getState();
    const { reviews } = state;

    let avgRating = 4.5;
    if (reviews.length > 0) {
      avgRating = reviews.map((review, index) => {
        return review.stars;
      }).reduce((accumulator, currentValue) => accumulator + currentValue) / reviews.length;
    }

    return (
      <React.Fragment>
        <h3 className={styles.test}>Customer reviews</h3>
        <h4>***** {reviews.length}</h4>
        <p>{avgRating} out of 5 stars</p>
        <div>HISTOGRAM HERE</div>
        <div>HISTOGRAM HERE</div>
        <div>HISTOGRAM HERE</div>
        <div>HISTOGRAM HERE</div>
        <p>See all {reviews.length} customer reviews ></p>
      </React.Fragment>
    );
  }
}

export default Header;

/*
example data
{"_id":"5b918722d4a71c1897abb02f","productId":37,"reviewId":368,"username":"Parker_Nader66","stars":1,"title":"est dolore ducimus","text":"Vel molestias consequatur voluptatum vero labore dicta repellendus aut corporis. Et cupiditate minus nam. Perspiciatis dolorem omnis provident.","timestamp":"2018-02-01T17:26:28.993Z","numHelpful":965,"verifiedPurchase":true,"imageUrl":"http://lorempixel.com/640/480","__v":0}
*/
