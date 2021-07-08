import { Component } from "react";
import { Redirect, withRouter } from "react-router";
import styles from './SearchBar.module.scss';

class SearchBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: '',
      onSubmit: props.onSubmit || ((event) => {}),
    }
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

    // TODO New search updates address but does not reload page which does not trigger results update.
    // TODO Redirect does not affect browser history; user can't 'Back' into previous search pages.
    const newRoute = `/search?q=${query}`;
    this.setState({
      redirect: <Redirect push to={newRoute} />
    });
  }

  render() {
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.value}
          placeholder="What are you looking for?"
          className={styles.input}
          onChange={this.handleChange}
        />
        <input
          type="submit"
          value="Search"
          className={styles.button}
        />
        {this.state.redirect}
      </form>
    );
  }
}
export default withRouter(SearchBar);