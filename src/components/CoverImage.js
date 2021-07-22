import { Component } from 'react';

import styles from './CoverImage.module.scss';

export class CoverImage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      noImage: false,
    };
  }

  onImageNotFound = () => {
    this.setState({noImage: true});
  }

  render() {
    return (
      <div className={styles.imageWrapper}>
        {this.props.src !== null && !this.state.noImage &&
          <img
            src={this.props.src}
            alt={this.props.alt}
            className={styles.image}
            onError={this.onImageNotFound}
          />
        }

        {this.state.noImage &&
          <div className={styles.noImageTitleCard}>
            <div className={styles.noImageTitleCardName}>
              {this.props.alt}
            </div>
          </div>
        }
      </div>
    );
  }
}