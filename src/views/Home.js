import { Component } from 'react';
import { Header } from '../components/Header';

import styles from './Home.module.scss';

export default class Home extends Component {

  tick = 0;

  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      click: 0
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Header />
          <div className={styles.catalog}>{this.state.searchResults}</div>
        </div>
      </div>
    );
  }
}
