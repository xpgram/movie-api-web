import { Component } from "react";
import { Redirect, withRouter } from "react-router";

import { ICross, IMagnifyingGlass } from "./Icons";

import styles from './SearchBar.module.scss';

class SearchBar extends Component {

  inputField = null;

  constructor(props) {
    super(props);

    this.state = {
      value: '',
      onSubmit: props.onSubmit || ((event) => {}),
    }

    if (window.location.search.includes('q='))
      this.state.value = this.parseQueryString(window.location.search);
  }

  // TODO Extract this somewhere (and from SearchResults) or discover a simpler way to acquire it.
  parseQueryString = (url) => {
    const stringToken = '?q=';
    const dataStart = url.indexOf(stringToken);
    const dataEnd = url.indexOf('?', dataStart) || undefined;
    const raw = url.slice(dataStart + stringToken.length, dataEnd);
    const query = raw.replaceAll('+', ' ');
    return query;
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const query = this.state.value.trim().replaceAll(' ','+'); // TODO url-to-query, query-to-url functions

    if (query.length === 0) {
      // TODO show error in search box or something; what does google do?
      return;
    }

    const newRoute = `/search?q=${query}`;
    this.setState({
      redirect: <Redirect push to={newRoute} />
    });

    this.inputField.blur();
  }

  setFocused = () => {
    this.setState({focused: true});
  }

  unsetFocused = () => {
    this.setState({focused: false});
  }

  clearInput = () => {
    this.setState({value: ''});
    this.inputField.focus();
  }

  render() {
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>

        {/* Input Bar */}
        <div className={styles.focusBorder}>
          <div className={(this.props.compact) ? styles.inputContainerCompact : styles.inputContainer}>
            <IMagnifyingGlass className={`${styles.icon} ${styles.iSearch}`} />
            <input
              type="text"
              ref={(input) => { this.inputField = input}}
              value={this.state.value}
              placeholder="What are you looking for?"
              className={styles.input}
              onChange={this.handleChange}
              onFocus={this.setFocused}
              onBlur={this.unsetFocused}
            />

            {this.state.value && <ICross
              className={`${styles.icon} ${styles.iClose}`}
              onClick={this.clearInput}
            />}

          </div>
        </div>

        {/* Search Button */}
        <div className={styles.focusBorder}>
          <input
            type="submit"
            value="Search"
            className={styles.button}
          />
        </div>

        {this.state.redirect}
      </form>
    );
  }
}
export default withRouter(SearchBar);