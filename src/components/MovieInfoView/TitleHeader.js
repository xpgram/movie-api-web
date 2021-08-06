import { Component } from "react";
import IMDbRatingWidget from "../IMDbRatingWidget";

import styles from './TitleHeader.module.scss';
import { VoteWidget } from "../VoteWidget";

export class TitleHeader extends Component {
  render() {
    const cursoryList = this.props.info.filter( v => Boolean(v) );
    const cursoryInfo = cursoryList.map( (v, i) => <div key={`cursoryInfo_${i}`} className={styles.info}> {v} </div> );

    return (
      <div className={styles.wrapper}>
        <div className={styles.titleContainer}>
          <div className={styles.title}> {this.props.title} </div>
          <div className={styles.infoContainer}>
            {cursoryInfo}
          </div>
        </div>
        <div className={styles.rightPanel}>
          <VoteWidget className={styles.voteButton} movieId={this.props.movieId} />
          <IMDbRatingWidget className={styles.imdb} rating={this.props.rating} votes={this.props.votes} />
        </div>
      </div>
    )
  }
}