import { Component } from "react";

import styles from './IMDbRatingWidget.module.scss';

export default class IMDbRatingWidget extends Component {
    render() {
        return (
            <div className={styles.wrapper}>
                {/* <path id='curve' d='M73.2,148.6c4-6.1,65.5-96.8,178.6-95.6c111.3,1.2,170.8,90.3,175.1,97' /> */}
                <div className={styles.header}> IMDb </div>
                <div className={styles.rating}> {this.props.rating} </div>
                <div className={styles.votes}> {this.props.votes} </div>
            </div>
        );
    }
}