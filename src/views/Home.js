import { Component } from 'react';
import SearchBar from '../components/SearchBar';
import LogoText from '../components/LogoText';

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
          <LogoText />
          <SearchBar />
          <div className={styles.catalog}>{this.state.searchResults}</div>
        </div>
      </div>
    );
  }
}
