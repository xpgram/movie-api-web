import { Component } from 'react';
import { Header } from '../components/Header';
import { TitleHeader } from '../components/MovieInfoView/TitleHeader';
import { CoverImage } from '../components/CoverImage';
import EmbroideredTerm from '../components/BorderComponent';
import LoadingIcon from '../components/LoadingIcon';

import styles from './MovieInformation.module.scss';

// const IMDB_API_KEY = 'k_e6xvn1mw';
const OMDB_API_KEY = '9a856410';

// TODO Center movie info in view unless scrollbar is engaged; too close to header.
// TODO Finish vote icon behavior.
// TODO Finish movie-info restructure: title header, title poster, title info.

export default class MovieInformation extends Component {

  mounted = true;   // Aids abandonment of async calls

  constructor(props) {
    super(props);
    this.state = {
      imdbID: window.location.search.slice(4),
      Poster: null,
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

      ready: false,   // TODO true if already cached?
    }
  }

  componentDidMount() {
    this.requestTitleDetails(this.state.imdbID);
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

    data.ready = true;    // Add new object value component to this.state

    this.setState(data);
  }

  render() {
    const {
      Poster, Title, Year, Runtime, Plot,
      Director, Writer, Genre, Language,
      Rated, imdbID, imdbRating, imdbVotes,
      Type,
    } = this.state;

    const cursoryInfoList = [`${Year} (${Type})`, Rated, Runtime]

    const genreList = Genre.split(',').map( (genre, idx) => {
      return (<EmbroideredTerm key={`genre_${idx}`}>{genre}</EmbroideredTerm>)
    });

    const languageList = Language.split(',').map( (language, idx) => {
      return (<div key={`language_${idx}`} className={styles.language}>{language}</div>);
    });
    // const languageList = <div className={styles.language}>{Language.replaceAll(',',' ·')}</div>;

    return (
      <div className={`${styles.movieInfoWrapper}`}>

        <Header compact={true} />

        {/* Loading Icon */}
        {!this.state.ready && (
          <div className={styles.loadingIcon}>
            <LoadingIcon visible={!this.state.ready} />
          </div>
        )}

        <div className={`${styles.contentWrapper} ${this.state.ready && styles.showPage}`}>
          <TitleHeader
            title={Title}
            info={cursoryInfoList}
            movieId={imdbID}
            rating={imdbRating}
            votes={imdbVotes}
          />

          {/* Section 2: Poster and details. */}
          <div className={styles.titleDetails}>
            <div style={{width: 'fit-content', height: 'fit-content'}}>
              <CoverImage src={Poster} alt={Title} />
            </div>
            
            <div className={styles.details}>
              <div> {/* Text div; wrapper separates user-select from visual accent. */}
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

              <div className={styles.detailsAccent} />
            </div>
          </div>
        </div>

      </div>
    );
  }
}