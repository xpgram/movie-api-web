import { Component } from 'react';

import styles from './CoverImage.module.scss';

export class CoverImage extends Component {
    render() {
        return (
            <div className={styles.imageWrapper}>
                <img
                    src={this.props.src}
                    alt={this.props.alt}
                    className={styles.image}
                    />
            </div>
        );
    }
}