import { Component } from 'react';

import styles from './MovieInformation.module.scss';

// const IMDB_API_KEY = 'k_e6xvn1mw';
const OMDB_API_KEY = '9a856410';

export default class MovieInformation extends Component {

  mounted = true;   // Aids abandonment of async calls

  constructor(props) {
    super(props);
    this.state = {
      imdbID: '',
      Poster: '',
      Title: '[title]',
      Year: '',
      Runtime: '',
      Director: '',
      Writer: '',
      Genre: '',
      Plot: '',
      Language: '',
      imdbRating: '',
      imdbVotes: '',
    }
  }

  componentDidMount() {
    const id = window.location.search.slice(4);
    this.requestTitleDetails(id);
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  requestTitleDetails = async (id) => {
    try {
      // const response = await fetch(`https://imdb-api.com/en/API/Title/${IMDB_API_KEY}/${id}`);
      const response = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`);
      const json = await response.json();
      this.handleResults(json);
    } catch(err) {
      console.warn(err);
      // TODO Show an error / redirect to not found / whatever.
      return;
    }
  }

  handleResults = (data) => {
    if (!this.mounted)
      return;

    data.Title = data.Title || this.state.Title;

    Object.entries(data).forEach( pair => {
      if (typeof pair[1] === 'string' && pair[1].toLowerCase() === 'n/a')
        data[pair[0]] = '';
    });

    this.setState(data);
  }

  render() {
    const {
      Poster, Title, Year, Runtime, Plot,
      Director, Writer, Genre, Language,
      Rated, imdbRating, imdbVotes, Type,
    } = this.state;

    const cursoryInfoList = [`${Year} (${Type})`, Rated, Runtime]
    const cursoryInfo = cursoryInfoList.filter( v => Boolean(v) ).join(' · ');

    const genreList = Genre.split(',').map( (genre, idx) => {
      return (<div key={`genre_${idx}`} className={styles.genre}>{genre}</div>);
    });

    const languageList = Language.split(',').map( (language, idx) => {
      return (<div key={`language_${idx}`} className={styles.language}>{language}</div>);
    });

    return (
      <div className={styles.movieInfoWrapper}>
        <div className={styles.header}>
          <h2 className={styles.title}>{Title}</h2>
          <div className={styles.cursoryInfo}>{cursoryInfo}</div>
          <div className={styles.imDbRatingWrapper}>
            <div className={styles.rating}>{imdbRating}</div>
            <div className={styles.votes}>{imdbVotes}</div>
          </div>
        </div>

        <img src={Poster} alt={Title} className={styles.coverImage} />
        <div className={styles.details}>
          <div className={styles.genreWrapper}>
            {genreList}
          </div>
          <p className={styles.directors}>{Director}</p>
          <p className={styles.writers}>{Writer}</p>
          <p className={styles.plot}>{Plot}</p>
          <div className={styles.languageWrapper}>
            {languageList}
          </div>
        </div>
      </div>
    );
  }
}