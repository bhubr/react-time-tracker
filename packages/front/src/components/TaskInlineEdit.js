import React from 'react';
import { connect } from 'react-redux';
import { updateTask, toggleTaskTitleEditing } from '../actions';

class TaskInlineEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.task.title,
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
    const { id } = this.props.task;
    const payload = {
      id,
      title: this.state.value,
    };
    this.props.updateTask(payload);
    this.props.toggleTaskTitleEditing(id);
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
  toggleTaskTitleEditing: (id) => dispatch(toggleTaskTitleEditing(id)),
  updateTask: (task) => dispatch(updateTask(task)),
});

export default connect(null, mapDispatchToProps)(TaskInlineEdit);
