
import { Component } from 'react';
import styles from './LoadingIcon.module.scss';

export default class LoadingIcon extends Component {

  render() {
    return (
      <div className={`${styles.ellipsis} ${!this.props.visible && styles.hidden}`}>
        <div/> <div/> <div/> <div/>
      </div>
    );
  }
}