import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import TaskList from './TaskList'
import TaskEdit from './TaskEdit'
import { getStoredTasks, storeTasks } from './storage'
// Useful links
// https://www.alsacreations.com/article/lire/1402-web-storage-localstorage-sessionstorage.html

class App extends Component {
  state = {
    tasks: getStoredTasks()
  }
  addTask = title => {
    const tasks = [...this.state.tasks]
    tasks.push({
      title, done: false
    })
    storeTasks(tasks)
    this.setState({ tasks })
  }
  render() {
    return (
      <Container>
        <TaskList tasks={this.state.tasks} />
        <TaskEdit onTaskSubmit={this.addTask} />
      </Container>
    )
  }
}

export default App
