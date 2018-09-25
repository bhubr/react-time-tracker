import React, { Component } from 'react'
import TaskList from './TaskList'
import TaskEdit from './TaskEdit'
import PageHeader from './PageHeader'
import TimeSliceCommentModal from './TimeSliceCommentModal'
import notifyMe from './helpers/notifyMe'

// Useful links
// https://www.alsacreations.com/article/lire/1402-web-storage-localstorage-sessionstorage.html

const TIMER_SLICE_DURATION = 10

class App extends Component {
  state = {
    timer: null,
    modalOpen: false
  }
  componentDidMount() {
    document.title = 'Pomodoro'
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
          <PageHeader />
          <TaskList
            startTimeSlice={this.startTimeSlice} />
          <TaskEdit />
          <TimeSliceCommentModal
            modalOpen={this.state.modalOpen}
            onCommentSubmit={this.onCommentSubmit} />
        </div>
      </div>
    )
  }
}

export default App
