import { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './MovieCard.module.scss';

export class MovieCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      id: props.data['imdbID'] || null,
      image: props.data['Poster'] || 'default-link',
      name: props.data['Title'] || '[title]',
      description: `${props.data['Year']} (${props.data['Type']})` || '',
      //rating: props.rating || 3,

      cardvisible: false,
      shadowVisible: false,
    };

    this.animOrdinal = Math.random()*6;
  }

  onLoad = () => {
    this.setState({
      shadowVisible: true,
    });

    setTimeout( () => {
      this.setState({
        cardVisible: true,
      });
    }, this.animOrdinal*100);
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={`${styles.shadow} ${this.state.shadowVisible && styles['shadow-visible']}`} />
        <Link className={styles['link-label']} to={`/movie?id=${this.state.id}`}>
          <div className={styles['zoom-container']}>
            <div className={`${styles.card} ${this.state.cardVisible && styles['card-visible']}`}>
              <img
                src={this.state.image}
                alt={this.state.name}
                onLoad={this.onLoad}
              />
              <div className={styles.overlay}>
                <div className={styles.text}>
                  <div className={styles.title}>{this.state.name}</div>
                  <div className={styles.year}>{this.state.description}</div>
                  {/* <Rating value={this.state.rating} /> */}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    )
  }
}