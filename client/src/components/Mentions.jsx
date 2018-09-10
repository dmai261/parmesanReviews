import React from 'react';
import styles from '../styles/Mentions.css';

class Mentions extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const state = this.props.getState();
    const { reviews } = state;
    return (
      <React.Fragment>
        <h4>Read reviews that mention</h4>
        <div className={styles.mentionContainer}>
          <div className={styles.mentionItem}>mention</div>
          <div className={styles.mentionItem}>mentionmention</div>
          <div className={styles.mentionItem}>mention</div>
          <div className={styles.mentionItem}>mention</div>
          <div className={styles.mentionItem}>mention</div>
          <div className={styles.mentionItem}>mentionmention</div>
          <div className={styles.mentionItem}>meon</div>
          <div className={styles.mentionItem}>mentmention</div>
          <div className={styles.mentionItem}>mention</div>
          <div className={styles.mentionItem}>mtion</div>
        </div>
        <div className={styles.container}>
          <img className={styles.doubleArrowDown} src='./img/doubleArrowDown.png' /><p className={styles.blue}>See more</p>
        </div>
      </React.Fragment>
    );
  }
}

export default Mentions;
