import React from 'react';
import styles from '../styles/Mentions.css';

class Mentions extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    // };
  }
  render() {
    const state = this.props.getState();
    const { reviews } = state;
    return (
      <React.Fragment>
        <h3 className={styles.test}>Read reviews that mention</h3>
        <p>MENTIONS HERE</p>
        <p>^ See more</p>
      </React.Fragment>
    );
  }
}

export default Mentions;
