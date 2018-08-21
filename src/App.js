import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import Clock from './Clock'
import TaskList from './TaskList'
import TaskEdit from './TaskEdit'
import { getStoredTasks, storeTasks } from './storage'

// Useful links
// https://www.alsacreations.com/article/lire/1402-web-storage-localstorage-sessionstorage.html

const TIMER_SLICE_DURATION = 5 * 60

class App extends Component {
  state = {
    tasks: getStoredTasks(),
    remainingTime: -1
  }
  addTask = title => {
    const tasks = [...this.state.tasks]
    tasks.push({
      title, done: false
    })
    storeTasks(tasks)
    this.setState({ tasks })
  }
  toggleDone = index => {
    const tasks = [...this.state.tasks]
    tasks[index].done = !tasks[index].done
    storeTasks(tasks)
    this.setState({ tasks })
  }
  deleteTask = index => {
    const tasks = [...this.state.tasks]
    tasks.splice(index)
    storeTasks(tasks)
    this.setState({ tasks })
  }
  startTimeSlice = index => {
    setInterval(this.timerTick, 1000)
    this.setState({
      remainingTime: TIMER_SLICE_DURATION
    })
  }
  timerTick = () => {
    this.setState(prevState => ({
      remainingTime: prevState.remainingTime - 1
    }))
  }
  render() {
    return (
      <Container>
        <div style={{ display: 'flex' }}>
          <h1 style={{ flexGrow: 1 }}>Time Tracker</h1>
          <Clock remainingTime={this.state.remainingTime} />
        </div>
        <TaskList
          tasks={this.state.tasks}
          toggleDone={this.toggleDone}
          deleteTask={this.deleteTask}
          startTimeSlice={this.startTimeSlice} />
        <TaskEdit onTaskSubmit={this.addTask} />
      </Container>
    )
  }
}

export default App
