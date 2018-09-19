import React from 'react'

class TaskEdit extends React.Component {
  state = {
    title: ''
  }
  handleChange = e => {
    this.setState({
      title: e.target.value
    })
  }
  handleSubmit = e => {
    e.preventDefault()
    if (!this.state.title) {
      return
    }
    this.setState({ title: '' })
    this.props.onTaskSubmit(this.state.title)
  }
  render() {
    return <form onSubmit={this.handleSubmit}>
      <input
        placeholder='Task title'
        onChange={this.handleChange}
        value={this.state.title} />
      <button type="submit">Submit</button>
    </form>
  }
}

export default TaskEdit
