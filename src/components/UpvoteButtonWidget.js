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
    this.setState({
      upvoted: !this.state.upvoted,
    });
  }
  
  render() {
    return (
      <div {...this.props}>
        <div className={styles.container}>
          <IStar
            className={ (this.state.upvoted) ? styles.active : styles.inactive }
            onClick={this.click}
          />
        </div>
      </div>
    );
  }
}