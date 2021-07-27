import { Component } from "react";
import axios from "axios";
import { IStar } from './Icons';

import styles from './UpvoteButtonWidget.module.scss';

// These are required to play nicely with Django
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "HTTP_X_CSRFTOKEN";

// This is required because my proxy isn't working for some reason. It does, but it doesn't.
// I keep getting 403's from :3000; it shouldn't even be *accessing* :3000.
const url = "http://localhost:8000";

// TODO Set api-url as an env variable, maybe. I obviously can't request from localhost on Heroku.

export class UpvoteButtonWidget extends Component {

  constructor(props) {
    super(props);
      this.state = {
      upvoteValue: 0,
      interactable: false,
      fixedReference: false,
    };
  }

  componentDidMount() {
    this.getVoteStatus();
  }

  getVoteStatus = async () => {
    try {
      const res = await axios.get(`${url}/api/MovieWeb/${this.props.movieId}/`);
      this.setState({
        upvoteValue: res.data['favorited'],
        fixedReference: true,
      });
    } catch (err) {
      if (err.response.status !== 404)
        console.warn(err);
    }
    this.setState({interactable: true});
  }

  updateDbListing = async (value) => {
    const item = {movieId: this.props.movieId, favorited: value};
    if (this.state.fixedReference)
      await axios.put(`${url}/api/MovieWeb/${item.movieId}/`, item);
    else {
      await axios.post(`${url}/api/MovieWeb/`, item);
      this.setState({fixedReference: true});
    }
  }
  
  click = async () => {
    if (!this.state.interactable) {
      return;
    }

    const oldStatus = this.state.upvoteValue;
    const newStatus = (this.state.upvoteValue) ? 0 : 1;

    this.setState({
      upvoteValue: newStatus,
      interactable: false,
    });

    try {
      await this.updateDbListing(newStatus);
    } catch (err) {
      // Revert
      console.log(err, err.response);
      this.setState({upvoteValue: oldStatus});
    }

    this.setState({interactable: true});
  }
  
  render() {
    const render = (
      <div className={`${styles.default} ${this.props.className}`}>
        <IStar
          className={ (this.state.upvoteValue) ? styles.active : styles.inactive }
          onClick={this.click}
        />
      </div>
    );

    return (this.props.movieId) ? render : null;
  }
}