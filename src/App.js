import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import TaskList from './TaskList'
import TaskEdit from './TaskEdit'

const tasks = [
  {
    title: 'Créer une appli de gestion de tâches',
    done: false
  },
  {
    title: 'Faire le tri dans mes dépôts GitHub',
    done: false
  },
  {
    title: 'Faire le tri dans mes backups',
    done: false
  }
]

class App extends Component {
  state = {
    tasks: tasks
  }
  addTask = title => {
    const tasks = [...this.state.tasks]
    tasks.push({
      title, done: false
    })
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
