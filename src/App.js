import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import TaskList from './TaskList'
import TaskEdit from './TaskEdit'

class App extends Component {
  addTask = title => {
    console.log('addTask', title)
  }
  render() {
    return (
      <Container>
        <TaskList />
        <TaskEdit onTaskSubmit={this.addTask} />
      </Container>
    )
  }
}

export default App
