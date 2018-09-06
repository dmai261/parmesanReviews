import React from 'react';
// import style from '../styles/main.css'; // TBD get modular css working

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={style.app}>Hello app!</div>
    )
  }
}

export default App;
