import React from 'react'
import { connect } from 'react-redux'
import { createTask } from '../actions'

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
    this.props.createTask(this.state.title)
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

const mapDispatchToProps = dispatch => ({
  createTask: title => dispatch(createTask(title))
})

export default connect(null, mapDispatchToProps)(TaskEdit)

