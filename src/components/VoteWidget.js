import { Component } from "react";
import axios from "axios";
import { IArrowUp, IArrowDown } from './Icons';

import styles from './VoteWidget.module.scss';

// These are required to play nicely with Django
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "HTTP_X_CSRFTOKEN";

const VoteStatus = {
  Neutral: 'neutral',
  Upvote: 'up',
  Downvote: 'down',
  CancelUpvote: 'cancel-up',
  CancelDownvote: 'cancel-down',
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
      const res = await axios.get(`/api/lookup/${this.props.movieId}/`);
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
      await axios.put(`/api/vote/${item.movieId}/`, item);
    else {
      await axios.post(`/api/vote/`, item);
      this.setState({fixedReference: true});
    }
  }
  
  click = async (voteValue) => {
    if (!this.state.interactable) {
      console.log(`not interactable`)
      return;
    }

    const cancelValue = (voteValue === VoteStatus.Upvote) ? VoteStatus.CancelUpvote : VoteStatus.CancelDownvote;

    const oldStatus = this.state.voteStatus;
    const newStatus = (this.state.voteStatus === voteValue) ? VoteStatus.Neutral : voteValue;

    this.setState({
      voteStatus: newStatus,
      interactable: false,
    });

    try {
      await this.updateDbListing( (newStatus === voteValue) ? voteValue : cancelValue );
    } catch (err) {
      console.log(err, err.response);
      this.setState({voteStatus: oldStatus});
    }

    this.getVoteCount();
  }

  upvote = () => {
    this.click(VoteStatus.Upvote);
  }

  downvote = () => {
    this.click(VoteStatus.Downvote);
  }
  
  render() {
    const render = (
      <div className={`${styles.default} ${this.props.className}`}>
        <IArrowUp
          className={`${styles.upvote} ${(this.state.voteStatus === VoteStatus.Upvote) ? styles.active : styles.inactive}`}
          onClick={this.upvote}
        />
        <IArrowDown
          className={`${styles.downvote} ${(this.state.voteStatus === VoteStatus.Downvote) ? styles.active : styles.inactive}`}
          onClick={this.downvote}
        />
        <div className={styles.voteCount}>{this.state.upvoteValue - this.state.downvoteValue}</div>
      </div>
    );

    return (this.props.movieId) ? render : null;
  }
}