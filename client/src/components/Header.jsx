import React from 'react';
// import style from '../styles/main.css'; // TBD get modular css working

class Header extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    // };
  }

  render() {
    return (
      <React.Fragment>
        <h2>Customer reviews</h2>
        <h3>***** 2,055</h3>
        <p>HISTOGRAM HERE</p>
        <h4>See all 2,055 customer reviews ></h4>
        <br></br>
        <h3>Rated by feature</h3>
        <h4>Easy to assemble</h4>
        <p>*****</p>
        <p>4.8 out of 5 stars</p>
      </React.Fragment>
    );
  }
}

export default Header;
