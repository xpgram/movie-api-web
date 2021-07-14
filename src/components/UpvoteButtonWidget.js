import { Component } from "react";

import styles from './UpvoteButtonWidget.module.scss';

export class UpvoteButtonWidget extends Component {

    constructor(props) {
        super(props);
        this.state = {
            upvoted: false,
        };
    }

    click = () => {
        this.setState({
            upvoted: !this.state.upvoted,
        });
    }

    render() {
        return (
            <div className={styles.wrapper} onClick={this.click}>
                <div className={ (this.state.upvoted) ? styles.starFive : styles.starFiveEmpty } />
            </div>
        );
    }
}