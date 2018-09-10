import React from 'react';
import styles from '../styles/Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  renderRatingHistogram(reviews) {
    const ratingArr = new Array(5).fill('');
    const histogram = ratingArr.map((ratingBucket, index) => {
      return (
        <React.Fragment>
          <div className={styles.histBarContainer}>
            <a className={styles.blueFlex}>{5 - index} star</a>
            <a className={styles.histBar}>HISTOGRAM HERE</a>
            <a className={styles.blueFlex}>99%</a>
            <br />
          </div>
        </React.Fragment>
      )
    });
    return histogram;
  }


  render() {
    const state = this.props.getState();
    const { reviews } = state;

    let avgRating;
    if (reviews.length > 0) {
      avgRating = reviews.map((review, index) => {
        return review.stars;
      }).reduce((accumulator, currentValue) => accumulator + currentValue) / reviews.length;
    }
    const starArr = this.props.renderStarRating(avgRating, 2);


    const histogram = this.renderRatingHistogram(reviews);


    return (
      <React.Fragment>
        <h3 className={styles.border}>Customer reviews</h3>
        <div><a className={styles.gold}><b>{starArr}</b></a><a className={styles.blueLarge}> {reviews.length}</a></div>
        <div className={styles.container}>
          <div className={styles.blueSmall}>{avgRating} out of 5 stars</div><img className={styles.arrowDown} src='./img/arrowDown.png'></img>
        </div>
        <div className={styles.histogram}>{histogram}</div>
        <div className={styles.container}>
          <p className={styles.blueSmall}>See all {reviews.length} customer reviews</p><img className={styles.blueArrowRight} src='./img/blueArrowRight.png'></img>
        </div>
      </React.Fragment>
    );
  }
}

export default Header;

/*
example data
{"_id":"5b918722d4a71c1897abb02f","productId":37,"reviewId":368,"username":"Parker_Nader66","stars":1,"title":"est dolore ducimus","text":"Vel molestias consequatur voluptatum vero labore dicta repellendus aut corporis. Et cupiditate minus nam. Perspiciatis dolorem omnis provident.","timestamp":"2018-02-01T17:26:28.993Z","numHelpful":965,"verifiedPurchase":true,"imageUrl":"http://lorempixel.com/640/480","__v":0}
*/
