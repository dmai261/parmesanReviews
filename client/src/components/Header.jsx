import React from 'react';
import styles from '../styles/Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    // };
  }

  render() {
    return (
      <React.Fragment>
        <h2 className={styles.test}>Customer reviews</h2>
        <h3>***** 2,055</h3>
        <p>HISTOGRAM HERE</p>
        <h4>See all 2,055 customer reviews ></h4>
        <h3>Rated by feature</h3>
        <h4 className={styles.test2}>Easy to assemble</h4>
        <p>*****</p>
        <p>4.8 out of 5 stars</p>
        <br></br>
      </React.Fragment>
    );
  }
}

export default Header;
