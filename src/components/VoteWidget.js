import { Component } from "react";
import axios from "axios";
import { IStar } from './Icons';

import styles from './VoteWidget.module.scss';

// These are required to play nicely with Django
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "HTTP_X_CSRFTOKEN";

const VoteStatus = {
  Neutral: 0,
  Upvoted: 1,
  Downvoted: -1,
}

export class VoteWidget extends Component {

  constructor(props) {
    super(props);
      this.state = {
        voteStatus: VoteStatus.Neutral,
        upvoteValue: 0,
        downvoteValue: 0,
        interactable: false,
        fixedReference: false,
    };
  }

  componentDidMount() {
    this.getVoteCount();
  }

  getVoteCount = async () => {
    try {
      const res = await axios.get(`/api/votes/${this.props.movieId}/`);
      this.setState({
        upvoteValue: res.data['upvotes'],
        downvoteValue: res.data['downvotes'],
        fixedReference: true,
      });
    } catch (err) {
      if (err.response.status !== 404)
        console.warn(err, err.response);
    }
    this.setState({interactable: true});
  }

  updateDbListing = async (value) => {
    const item = {movieId: this.props.movieId, vote: value};
    if (this.state.fixedReference)
      await axios.put(`/api/votes/${item.movieId}/`, item);
    else {
      await axios.post(`/api/votes/`, item);
      this.setState({fixedReference: true});
    }
  }
  
  click = async (event) => {
    if (!this.state.interactable) {
      console.log(`not interactable`)
      return;
    }

    // TODO getAttribute does not work. As is.
    // Is this incomplete? this[event.target.name], what does this do?
    const voteDirection = event.target.getAttribute('voteDirection');
    const voteDirNumeral = (voteDirection === 'up') ? VoteStatus.Upvote : VoteStatus.Downvote;
    console.log(`dir=${voteDirNumeral} str=${voteDirection}`)

    const oldStatus = this.state.voteStatus;
    const newStatus = (this.state.voteStatus === voteDirNumeral) ? VoteStatus.Neutral : voteDirNumeral;

    this.setState({
      voteStatus: newStatus,
      interactable: false,
    });

    try {
      await this.updateDbListing(newStatus);
    } catch (err) {
      console.log(err, err.response);
      this.setState({voteStatus: oldStatus});
    }

    this.setState({interactable: true});
  }
  
  render() {
    const render = (
      <div className={`${styles.default} ${this.props.className}`}>
        <IStar  //IUpArrow
          className={ (this.state.voteStatus === VoteStatus.Upvote) ? styles.active : styles.inactive }
          onClick={this.click}
          voteDirection='up'
        />
        <IStar  //IDownArrow
          className={ (this.state.voteStatus === VoteStatus.Downvote) ? styles.active : styles.inactive }
          onClick={this.click}
          voteDirection='down'
        />
        <div className={styles.voteCount}>{this.state.upvoteValue - this.state.downvoteValue}</div>
      </div>
    );

    return (this.props.movieId) ? render : null;
  }
}