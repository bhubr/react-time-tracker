import React, { Component } from 'react'
import Clock from './Clock'
import TaskList from './TaskList'
import TaskEdit from './TaskEdit'
import TimeSliceCommentModal from './TimeSliceCommentModal'
import { getStoredTasks, storeTasks } from './storage'
import notifyMe from './notifyMe'

// Useful links
// https://www.alsacreations.com/article/lire/1402-web-storage-localstorage-sessionstorage.html

const TIMER_SLICE_DURATION = 10

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
      timeSlices: [],
      id: tasks.length + 1
    })
    storeTasks(tasks)
    this.setState({ tasks })
  }
  toggleDone = taskId => {
    const tasks = [...this.state.tasks]
    const task = tasks.find(task => task.id === taskId)
    task.done = !task.done
    console.log(task)
    storeTasks(tasks)
    this.setState({ tasks })
  }
  deleteTask = taskId => {
    const tasks = [...this.state.tasks]
    const taskIndex = tasks.findIndex(task => task.id === taskId)
    tasks.splice(taskIndex, 1)
    storeTasks(tasks)
    this.setState({ tasks })
  }
  startTimeSlice = taskId => {
    const task = this.state.tasks.find(task => task.id === taskId)
    if (task.done) {
      return
    }
    const interval = setInterval(this.timerTick, 1000)
    const timer = {
      interval,
      comment: '',
      remainingTime: TIMER_SLICE_DURATION,
      datetimeStart: new Date(),
      taskId: task.id
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
      const { datetimeStart, taskId, comment } = timer
      const datetimeEnd = new Date()
      const tasks = this.state.tasks.map(task => ({ ...task }))
      const task = tasks.find(task => task.id === taskId)
      if (!task.timeSlices) {
        task.timeSlices = []
      }
      task.timeSlices.push({
        datetimeStart: datetimeStart.toString(),
        datetimeEnd: datetimeEnd.toString(),
        comment
      })
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
      <div>
        <nav>
          <ul>
            <li>TimeTracker</li>
          </ul>
        </nav>
        <div className="container">
          <div className="page-header">
            <h1 className="page-title">Time Tracker</h1>
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
        </div>
      </div>
    )
  }
}

export default App
