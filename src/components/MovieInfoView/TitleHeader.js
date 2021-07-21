import { Component } from "react";
import { UpvoteButtonWidget } from "../UpvoteButtonWidget";
import IMDbRatingWidget from "../IMDbRatingWidget";

import styles from './TitleHeader.module.scss';

export class TitleHeader extends Component {
  render() {
    const cursoryInfo = this.props.info.map( v => <div className={styles.info}> {v} </div> );

    return (
      <div className={styles.wrapper}>
        <div className={styles.titleContainer}>
          <div className={styles.title}> {this.props.title} </div>
          <div className={styles.infoContainer}>
            {cursoryInfo}
          </div>
        </div>
        <div className={styles.rightPanel}>
          <UpvoteButtonWidget className={styles.upButton} />
          <IMDbRatingWidget className={styles.imdb} rating={this.props.rating} votes={this.props.votes} />
        </div>
      </div>
    )
  }
}