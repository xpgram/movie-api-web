import { Component } from "react";

import styles from './ErrorMessage.module.scss';

export default class ErrorMessage extends Component {

  render() {
    return (
      <div className={`${styles.text}`}>
        {this.props.text}
      </div>
    );
  }
}

// TODO Use PROPS to animate data that the parent controls. Do not even bother updating state.
// Reinstitute animations, then. Right now, I'm hot. Tired. Ugh.