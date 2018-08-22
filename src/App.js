import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import Clock from './Clock'
import TaskList from './TaskList'
import TaskEdit from './TaskEdit'
import TimeSliceCommentModal from './TimeSliceCommentModal'
import { getStoredTasks, storeTasks } from './storage'
import notifyMe from './notifyMe'

// Useful links
// https://www.alsacreations.com/article/lire/1402-web-storage-localstorage-sessionstorage.html

const TIMER_SLICE_DURATION = 15 //* 60

class App extends Component {
  state = {
    tasks: getStoredTasks(),
    timer: null,
    modalOpen: false
  }
  addTask = title => {
    const tasks = [...this.state.tasks]
    tasks.push({
      title,
      done: false,
      timeSlices: []
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
  startTimeSlice = taskIndex => {
    if (this.state.tasks[taskIndex].done) {
      return
    }
    const interval = setInterval(this.timerTick, 1000)
    const timer = {
      interval,
      comment: '',
      remainingTime: TIMER_SLICE_DURATION,
      datetimeStart: new Date(),
      taskIndex
    }
    this.setState({
      timer,
      modalOpen: true
    })
  }
  timerTick = () => {
    this.setState(prevState => {
      const timer = { ...prevState.timer }
      timer.remainingTime -= 1
      if(timer.remainingTime > 0) {
        return { timer }
      }
      notifyMe()
      clearInterval(timer.interval)
      const { datetimeStart, taskIndex, comment } = timer
      const datetimeEnd = new Date()
      const tasks = [...this.state.tasks]
      const task = {...tasks[taskIndex]}
      if (!task.timeSlices) {
        task.timeSlices = []
      }
      task.timeSlices.push({
        datetimeStart, datetimeEnd, comment
      })
      tasks.splice(taskIndex, 1, task)
      storeTasks(tasks)
      return { tasks, timer: null }
    })
  }
  onCommentSubmit = comment => {
    const timer = { ...this.state.timer }
    if (!timer) {
      return
    }
    timer.comment = comment
    this.setState({ timer, modalOpen: false })
  }
  render() {
    return (
      <Container>
        <div style={{ display: 'flex' }}>
          <h1 style={{ flexGrow: 1 }}>Time Tracker</h1>
          <Clock timer={this.state.timer} />
        </div>
        <TaskList
          tasks={this.state.tasks}
          toggleDone={this.toggleDone}
          deleteTask={this.deleteTask}
          startTimeSlice={this.startTimeSlice} />
        <TaskEdit onTaskSubmit={this.addTask} />
        <TimeSliceCommentModal
          modalOpen={this.state.modalOpen}
          onCommentSubmit={this.onCommentSubmit} />
      </Container>
    )
  }
}

export default App
