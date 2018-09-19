import React from 'react';
import $ from 'jquery';
import styles from '../styles/Header.css';

require('../../../server/helpers/jquery-visible.min.js');

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // check if inview and if so animate
    setInterval(() => {
      if ($('#scrollTarget').visible()) {
        // wildcard jquery selector
        $('[id^=histBar]').addClass(styles.animated);
      }
    }, 500);
  }

  renderRatingHistogram(reviews) {
    /*
    example data - reviews should be an array of objects like these
    {"_id":"5b918722d4a71c1897abb02f","productId":37,"reviewId":368,"username":"Parker_Nader66","stars":1,"title":"est dolore ducimus","text":"Vel molestias consequatur voluptatum vero labore dicta repellendus aut corporis. Et cupiditate minus nam. Perspiciatis dolorem omnis provident.","timestamp":"2018-02-01T17:26:28.993Z","numHelpful":965,"verifiedPurchase":true,"imageUrl":"http://lorempixel.com/640/480","__v":0}
    */

    const ratings = reviews.map((reviewObject, index) => {
      return reviewObject.stars;
    })

    const countedRatings = ratings.reduce((talliedRatings, rating) => {
      if (rating in talliedRatings) {
        talliedRatings[rating] += 1;
      } else {
        talliedRatings[rating] = 1;
      }
      return talliedRatings;
    }, {});

    const ratingBuckets = new Array(5).fill('');
    const histogram = ratingBuckets.map((ratingBucket, index) => {
      const currentStar = 5 - index;
      const percentageOfRatings = (countedRatings[currentStar] / reviews.length) * 100 || 0;
      const style = {
        // TBD fix hardcoded arbitrary scalar 44
        width: `${(percentageOfRatings / 100) * 44}vmin`,
      }
      return (
        <React.Fragment>
          <div className={styles.histBarContainer}>
            <a className={styles.blueFlex}>{currentStar} star</a>
            <a id={`histBar${index}`} style={style} className={styles.histBar}></a>
            <a className={styles.histBarBackground}></a>
            <a className={styles.blueFlexRight}>{percentageOfRatings}%</a>
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

    const ratingBlurb = `${avgRating} out of 5 stars`;

    return (
      <React.Fragment>
        <h3 className={styles.border}>Customer reviews</h3>
        <div title={ratingBlurb} className={styles.blurbContainer}><a className={styles.gold}><b>{starArr}</b></a><a className={styles.blueLarge}> {reviews.length}</a></div>
        <div className={styles.container}>
          <div className={styles.blueSmall}>{ratingBlurb}</div><img className={styles.arrowDown} src='https://s3-us-west-1.amazonaws.com/avh-fec-component/img/arrowDown.png'></img>
        </div>
        <div className={styles.histOuterContainer}><div className={styles.histogram}>{histogram}</div><div className={styles.shareContainer}><a className={styles.shareText}>Share your thoughts with other customers</a><br /><button className={styles.button}>Write a customer review</button></div></div>
        <div className={styles.container}>
          <p id="scrollTarget" className={styles.blueSmall}>See all {reviews.length} customer reviews</p><img className={styles.blueArrowRight} src='https://s3-us-west-1.amazonaws.com/avh-fec-component/img/blueArrowRight.png'></img>
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
