import { Component } from "react";

import styles from './LogoText.module.scss';


export default class LogoText extends Component {
  render() {
    const title = "Movies.TV.Find.Lookfor.Results.Get";

    if (this.props.compact) {
      return (
        <div className={styles.textSmall}> {title} </div>
      )
    }

    return (
      <div className={styles.text}> {title} </div>
    )
  }
}