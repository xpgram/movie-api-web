import { Component } from "react";

import styles from './IMDbRatingWidget.module.scss';

export default class IMDbRatingWidget extends Component {
  render() {
    return (
      <div {...this.props}>
        <div className={styles.border}>
          <div className={styles.wrapper}>
            <div className={styles.header}> IMDb </div>
            <div className={styles.rating}> {this.props.rating} </div>
            <div className={styles.votes}> {this.props.votes} </div>
          </div>
        </div>
      </div>
    );
  }
}