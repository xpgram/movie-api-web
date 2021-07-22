import { Component } from "react";
import { IStar } from './Icons';

import styles from './UpvoteButtonWidget.module.scss';

export class UpvoteButtonWidget extends Component {

  constructor(props) {
    super(props);
      this.state = {
      upvoted: false,
    };
  }
  
  click = () => {
    // TODO Request DB or whatever update movieId upvote.

    this.setState({
      upvoted: !this.state.upvoted,
    });
  }
  
  render() {
    const render = (
      <div className={styles.default} {...this.props}>
        <IStar
          className={ (this.state.upvoted) ? styles.active : styles.inactive }
          onClick={this.click}
        />
      </div>
    );

    return (this.props.movieId) ? render : null;
  }
}