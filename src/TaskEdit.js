import React from 'react'
import { Input, Button } from 'semantic-ui-react'

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
    this.props.onTaskSubmit(this.state.title)
  }
  render() {
    return <form onSubmit={this.handleSubmit}>
      <Input
        placeholder='Task title'
        onChange={this.handleChange}
        value={this.state.title} />
      <Button type="submit">Submit</Button>
    </form>
  }
}

export default TaskEdit
