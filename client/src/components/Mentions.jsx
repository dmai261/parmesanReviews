import React from 'react';
import styles from '../styles/Mentions.css';

class Mentions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  handleSeeMoreClick() {
    const newExpanded = !this.state.expanded;
    this.setState({
      expanded: newExpanded,
    });
  }

  render() {
    const mentionPhrases = ['lorem', 'ipsum', 'is', 'simply', 'dummy', 'text', 'of', 'the', 'printing', 'and', 'typesetting', 'industry', 'lorem', 'ipsum', 'is', 'simply', 'dummy', 'text', 'of', 'the', 'printing', 'and', 'typesetting', 'industry'];

    let mentions = mentionPhrases.map((phrase, index) => {
      return <div key={index} className={styles.mentionItem}>{phrase}</div>;
    });

    let seeMore = <React.Fragment><img className={styles.doubleArrowDown} src='https://s3-us-west-1.amazonaws.com/avh-fec-component/img/orangeDoubleArrowUp.png' /> <p className={styles.blue}>See less</p></React.Fragment>;

    if (!this.state.expanded) {
      mentions = mentions.slice(0, 15);
      seeMore = <React.Fragment><img className={styles.doubleArrowDown} src='https://s3-us-west-1.amazonaws.com/avh-fec-component/img/doubleArrowDown.png' /> <p className={styles.blue}>See more</p></React.Fragment>;
    }

    return (
      <React.Fragment>
        <h4>Read reviews that mention</h4>
        <div className={styles.mentionContainer}>
          {mentions}
        </div>
        <div className={styles.container} onClick={this.handleSeeMoreClick.bind(this)}>
          {seeMore}
        </div>
      </React.Fragment>
    );
  }
}

export default Mentions;
