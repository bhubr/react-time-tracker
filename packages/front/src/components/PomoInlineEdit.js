import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  updateTimeSlice as updateTimeSliceAction,
  togglePomoCommentEditing as togglePomoCommentEditingAction
} from '../actions';
import timeboxPropTypes from '../prop-types/time-slice';

class PomoInlineEdit extends React.Component {
  constructor(props) {
    super(props);
    const { pomo: { comment } } = props;
    this.state = {
      value: comment,
    };
  }

  componentDidMount() {
    this.nameInput.focus();
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { pomo: { id, taskId }, updateTimeSlice, togglePomoCommentEditing } = this.props;
    const { value } = this.state;
    const payload = {
      comment: value,
      taskId,
    };
    updateTimeSlice(id, payload);
    togglePomoCommentEditing(id);
  }

  render() {
    const { value } = this.state;
    return (
      <form className="inline" onSubmit={this.handleSubmit}>
        <input
          type="text"
          ref={(input) => { this.nameInput = input; }}
          value={value}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}

PomoInlineEdit.propTypes = {
  updateTimeSlice: PropTypes.func.isRequired,
  togglePomoCommentEditing: PropTypes.func.isRequired,
  pomo: timeboxPropTypes.isRequired,
};

const mapDispatchToProps = {
  updateTimeSlice: updateTimeSliceAction,
  togglePomoCommentEditing: togglePomoCommentEditingAction,
};

export default connect(null, mapDispatchToProps)(PomoInlineEdit);
