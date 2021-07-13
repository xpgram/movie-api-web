import { Component } from "react";

import styles from './BorderComponent.module.scss';

export default class BorderComponent extends Component {
    render() {
        return (
            <div className={styles.embroidery}>
                {this.props.children}
            </div>
        );
    }
}