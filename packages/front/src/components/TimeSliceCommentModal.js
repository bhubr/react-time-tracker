import React, { Component } from 'react';

export default class TimeSliceCommentModal extends Component {
  state = {
    comment: '',
  }

  handleChange = (e) => {
    this.setState({
      comment: e.target.value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.comment) {
      return;
    }
    this.props.onCommentSubmit(this.state.comment);
  }

  render() {
    return (
      <div
        open={this.props.modalOpen}
        onClose={this.handleClose}
        size="small"
      >
        <div>
          Please describe what you're about to do.
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              placeholder="What are you gonna do?"
              onChange={this.handleChange}
              value={this.state.comment}
            />
            <button color="green" type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}
