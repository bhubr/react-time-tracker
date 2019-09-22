import React from 'react';
import { connect } from 'react-redux';
import { updateTimeSlice, togglePomoCommentEditing } from '../actions';

class PomoInlineEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.pomo.comment,
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
    const { id } = this.props.pomo;
    const payload = {
      comment: this.state.value,
    };
    this.props.updateTimeSlice(id, payload);
    this.props.togglePomoCommentEditing(id);
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

const mapDispatchToProps = (dispatch) => ({
  togglePomoCommentEditing: (id) => dispatch(togglePomoCommentEditing(id)),
  updateTimeSlice: (id, payload) => dispatch(updateTimeSlice(id, payload)),
});

export default connect(null, mapDispatchToProps)(PomoInlineEdit);
