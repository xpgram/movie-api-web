import { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './MovieCard.module.scss';
import { UpvoteButtonWidget } from './UpvoteButtonWidget';

// TODO Extract from SearchResults page
// I want to use this on MovieInfo, too, via <MovieCard hover='disabled' />
// This will disable black overlay on hover, but will still-nable the vote icon.
// This will sharpen corners? Hm... what to do...

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
      noImageDisplay: false,
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

  onImageNotFound = () => {
    this.setState({
      shadowVisible: true,
      noImageDisplay: true,
    });

    setTimeout( () => {
      this.setState({
        cardVisible: true,
      });
    }, this.animOrdinal*100);
  }

  // TODO MovieCard should use CoverImage internally; helps unify no-image stylings.

  render() {
    return (
      <div className={styles.container}>
        <div className={`${styles.shadow} ${this.state.shadowVisible && styles['shadow-visible']}`} />
        <div className={styles['zoom-container']}>
          <div className={`${styles.card} ${this.state.cardVisible && styles['card-visible']}`}>

            {!this.state.noImageDisplay && <img
              className={styles.poster}
              src={this.state.image}
              alt={this.state.name}
              onLoad={this.onLoad}
              onError={this.onImageNotFound}
            />}
            {this.state.noImageDisplay && <div className={styles.noImageTitleCard}>
              <div className={styles.noImageTitleCardName}>
                {this.state.name}
              </div>
            </div>}

            <Link className={styles['link-label']} to={`/movie?id=${this.state.id}`}>
              <div className={styles.overlay}>
                <div className={styles.text}>
                  <div className={styles.title}>{this.state.name}</div>
                  <div className={styles.year}>{this.state.description}</div>
                  {/* <Rating value={this.state.rating} /> */}
                </div>
              </div>
            </Link>

            <UpvoteButtonWidget className={styles.upbutton} movieId={this.state.id} />

          </div>
        </div>
      </div>
    )
  }
}