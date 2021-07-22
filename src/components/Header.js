import { Component } from "react";
import { Link } from 'react-router-dom';
import LogoText from "./LogoText";
import SearchBar from "./SearchBar";

import styles from './Header.module.scss';

export class Header extends Component {

  render() {
    return (
      <header className={this.props.compact && styles.compactHeader}>
        <Link className={styles.link} to='/'>
          <LogoText compact={this.props.compact} />
        </Link>
        <span className={styles.search}>
          <SearchBar compact={this.props.compact} />
        </span>
      </header>
    );
  }
}