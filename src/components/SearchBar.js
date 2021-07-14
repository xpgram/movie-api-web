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

    const newRoute = `/search?q=${query}`;
    this.setState({
      redirect: <Redirect push to={newRoute} />
    });
  }

  // TODO Use svg for mag glass instead.
  render() {
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>

        {/* Input Bar */}
        <div className={styles.focusBorder}>
          <div className={styles.inputContainer}>
            <i className={styles.iconSearch} />
            <input
              type="text"
              value={this.state.value}
              placeholder="What are you looking for?"
              className={styles.input}
              onChange={this.handleChange}
            />
          </div>
        </div>

        <span className={styles.spacer} />

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