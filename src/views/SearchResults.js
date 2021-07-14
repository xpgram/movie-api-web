import { Component } from 'react';
import { Header } from '../components/Header';
import ErrorMessage from '../components/ErrorMessage';
import LoadingIcon from '../components/LoadingIcon';
import { MovieCard } from '../components/MovieCard';

import styles from './SearchResults.module.scss';

// const IMDB_API_KEY = 'k_e6xvn1mw';    // TODO Make this retrievable from the backend.
const OMDB_API_KEY = '9a856410';

export default class SearchResults extends Component {

  lastFetchToken = null;  // Aids abandonment of old, incomplete fetch requests.

  static getDefaultState() {
    return {
      searchResults: [],
      loadingIconVisible: true,
      catalogContent: <></>,
      urlExt: window.location.search,
    };
  }

  constructor(props) {
    super(props);
    this.state = SearchResults.getDefaultState();
  }

  componentDidMount() {
    this.initiateSearch();
  }

  componentWillUnmount() {
    if (this.lastFetchToken)
      this.lastFetchToken.abort();
  }

  componentDidUpdate() {
    if (this.state.urlExt !== window.location.search) {
      const state = SearchResults.getDefaultState();
      this.setState(state);
      this.initiateSearch();
    }
  }

  initiateSearch = () => {
    const query = this.parseQueryString(window.location.search);
    this.requestSearchResults(query);
  }

  parseQueryString = (url) => {
    const stringToken = '?q=';
    const dataStart = url.indexOf(stringToken);
    const dataEnd = url.indexOf('?', dataStart) || undefined;
    const raw = url.slice(dataStart + stringToken.length, dataEnd);
    const query = raw.replaceAll('+', ' ');
    return query;
  }

  requestSearchResults = async (query) => {
    // TODO Extract the token stuff

    // Abort last token
    if (this.lastFetchToken !== null)
      this.lastFetchToken.abort();
    
    // Create new token
    const token = this.lastFetchToken = {
      aborted: false,
      abort() {
        this.aborted = true;
      }
    }

    // Request OMDb results
    try {
      const response = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${query}`);
      const json = (response) ? await response.json() : {};
      if (!token.aborted) {
        this.handleSearchResults(json);
        if (token === this.lastFetchToken)
          this.lastFetchToken = null;
      }
    } catch (err) {
      console.warn(err);
      let displayMessage = 'Something went wrong. Please try again later.';

      if (err.message === 'Failed to fetch')
        displayMessage = 'Movie database is experiencing heavy load or is broken. Please try again later.';

      this.setState({
        loadingIconVisible: false,
        searchResults: <ErrorMessage text={displayMessage} />
      });
    }
  }

  handleSearchResults = (response) => {
    // TODO Extract error type?
    if (response.errorMessage) {
      const e = new Error(response.errorMessage);
      e.name = 'IMDb Fetch Error';
      throw e;
    }

    // Map search results to catalog items.
    let processedResults = 
      (response.Search || [])
      .map( (result, idx) => {
        return (
          <MovieCard data={result} key={`result_${idx}`} />
        );
      });
    
    // Check: No results
    if (processedResults.length === 0)
      processedResults = <ErrorMessage text={`No results found. Sorry for yelling at you in red text.`} />;

    this.setState({
      loadingIconVisible: false,
      searchResults: processedResults,
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <Header />

          <div className={styles.catalog}>
            <LoadingIcon visible={this.state.loadingIconVisible} />
            {this.state.searchResults}
          </div>
        </div>
      </div>
    );
  }
}
