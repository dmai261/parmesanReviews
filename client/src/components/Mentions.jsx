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
        <h4>Read reviews that mention</h4>
        <p>MENTIONS HERE     MENTIONS HERE     MENTIONS HERE      MENTIONS HERE</p>
        <p>        MENTIONS HERE     MENTIONS HERE      MENTIONS HERE</p>
        <p className={styles.blue}>+ See more</p>
      </React.Fragment>
    );
  }
}

export default Mentions;
