import React from 'react';
import styles from '../styles/Review.css';
class Review extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { review } = this.props;
    return (
      <React.Fragment>
        <div className={styles.review}>
          <div className={styles.profileContainer}><img className={styles.profile} src='./img/profile.jpg'></img> {review.username}</div>
          <br></br>
          <div><a className={styles.gold}><b>*****</b> </a><b>{review.title}</b></div>
          <div className={styles.grey}>{review.timestamp}</div>
          <div className={styles.orange}>TBD Verified {review.verifiedPurchase}</div>
          <div>{review.text}</div>
          <br></br>
          <div className={styles.grey}>{review.numHelpful} people found this helpful</div>
          <div><button>Helpful</button> <a className={styles.grey}>    Comment    |     Report Abuse   </a></div>
          <br></br>
          <br></br>
        </div>
      </React.Fragment>
    );
  }
}

export default Review;

/*
example data
{"_id":"5b918722d4a71c1897abb02f","productId":37,"reviewId":368,"username":"Parker_Nader66","stars":1,"title":"est dolore ducimus","text":"Vel molestias consequatur voluptatum vero labore dicta repellendus aut corporis. Et cupiditate minus nam. Perspiciatis dolorem omnis provident.","timestamp":"2018-02-01T17:26:28.993Z","numHelpful":965,"verifiedPurchase":true,"imageUrl":"http://lorempixel.com/640/480","__v":0}
*/
