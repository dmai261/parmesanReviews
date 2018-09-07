import React from 'react';

class Review extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { review } = this.props;
    return (
      <React.Fragment>
        <div>%PIC% {review.username}</div>
        <br></br>
        <div>***** <b>{review.title}</b></div>
        <div>{review.timestamp}</div>
        <div>Verified? {review.verifiedPurchase}</div>
        <div>{review.text}</div>
        <br></br>
        <div>{review.numHelpful} people found this helpful</div>
        <br></br>
        <div><button>Helpful</button> Comment Report Abuse</div>
        <br></br>
        <br></br>
      </React.Fragment>
    );
  }
}

export default Review;

/*
example data
{"_id":"5b918722d4a71c1897abb02f","productId":37,"reviewId":368,"username":"Parker_Nader66","stars":1,"title":"est dolore ducimus","text":"Vel molestias consequatur voluptatum vero labore dicta repellendus aut corporis. Et cupiditate minus nam. Perspiciatis dolorem omnis provident.","timestamp":"2018-02-01T17:26:28.993Z","numHelpful":965,"verifiedPurchase":true,"imageUrl":"http://lorempixel.com/640/480","__v":0}
*/
