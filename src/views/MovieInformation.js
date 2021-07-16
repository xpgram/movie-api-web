import { Component } from 'react';
import EmbroideredTerm from '../components/BorderComponent';
import IMDbRatingWidget from '../components/IMDbRatingWidget';
import { CoverImage } from '../components/CoverImage';

import styles from './MovieInformation.module.scss';
import { UpvoteButtonWidget } from '../components/UpvoteButtonWidget';
import { Header } from '../components/Header';

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
      const response = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}&plot=full`);
      // TODO Get the full plot info.
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
      return (<EmbroideredTerm key={`genre_${idx}`}>{genre}</EmbroideredTerm>)
    });

    const languageList = Language.split(',').map( (language, idx) => {
      return (<div key={`language_${idx}`} className={styles.language}>{language}</div>);
    });
    // const languageList = <div className={styles.language}>{Language.replaceAll(',',' ·')}</div>;

    return (
      <div className={styles.movieInfoWrapper}>
      <div className={styles.movieInfoWrapperB}>

        <Header compact={true} />

        {/* Section 1: Title, Category and IMDb Rating. */}
        <div className={styles.heading}>
          {/* <div> */}
            <div className={styles.titleInfo}>
              <h2 className={styles.title}>{Title}</h2>
              <div className={styles.cursoryInfo}>{cursoryInfo}</div>
            </div>
          {/* </div> */}
          <UpvoteButtonWidget />
          <IMDbRatingWidget rating={imdbRating} votes={imdbVotes} />
        </div>

        {/* Section 2: Poster and details. */}
        <div className={styles.titleDetails}>
          <CoverImage src={Poster} alt={Title} />
          {/* <img src={Poster} alt={Title} className={styles.coverImage} /> */}
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
  
      </div>
      </div>
    );
  }
}