import React from 'react'
import { connect } from 'react-redux'
import formatTime from '../helpers/formatTime'
import getMySQLTimestamp from '../helpers/getMySQLTimestamp'
import getNowSeconds from '../helpers/getNowSeconds'
import notifyMe from '../helpers/notifyMe'
import Icon from './Icon'
import { TIMER_POMODORO, TIMER_SHORT_BREAK, TIMER_LONG_BREAK } from '../constants'
import {
  startTimeSlice,
  updateTimeSlice,
  startBreak,
  timerStarted,
  timerStopped,
  timerTick
} from '../actions'

const isBreak = status => [TIMER_SHORT_BREAK, TIMER_LONG_BREAK].includes(status)
const isPomodoro = status => status === TIMER_POMODORO

class Clock extends React.Component {
  componentDidMount() {
    const { timerStarted, timerTick } = this.props
    const startedAt = getNowSeconds()
    const interval = setInterval(timerTick, 1000)
    timerStarted(startedAt, interval)
  }
  componentDidUpdate() {
    const { timer, startTimeSlice, endTimeSlice, startBreak, timerStarted, timerTick, timerStopped } = this.props
    if (timer.remaining <= 0 && timer.startedAt) {
      console.log('timer reaches 0')
      notifyMe(isPomodoro(timer.status) ? 'Take a break!' : 'Get back to work!')
      clearInterval(timer.interval)
      if (isPomodoro(timer.status)) {
        console.log('was pomo, start break', typeof endTimeSlice)
        endTimeSlice(timer.timeSliceId)
        const startedAt = getNowSeconds()
        const interval = setInterval(timerTick, 1000)
        startBreak(startedAt, interval)
        setTimeout(() => fetch('/api/lock'), 1000)
      } else if (isBreak(timer.status) && timer.autoStart) {
        console.log('was break, start pomo')
        startTimeSlice(timer.taskId)
        const startedAt = getNowSeconds()
        const interval = setInterval(timerTick, 1000)
        timerStarted(startedAt, interval)
      } else {
        console.log('stop')
        timerStopped()
      }
    }
  }
  componentWillUnmount() {
    console.log('will unmount')
  }
  handleStop = () => {
    const { timer, timerStopped, endTimeSlice } = this.props
    if (! timer.interval) {
      return
    }
    clearInterval(timer.interval)
    if (timer.timeSliceId) {
      endTimeSlice(timer.timeSliceId)
    }
    timerStopped()
  }
  render () {
    const { timer } = this.props
    return (
      <div>
        <Icon onClick={this.handleStop} name='stop' />
        <span>
        { formatTime(timer.remaining) }
        </span>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  timer: state.timer
})

const mapDispatchToProps = dispatch => ({
  startBreak: (startedAt, interval) => dispatch(startBreak(startedAt, interval)),
  startTimeSlice: taskId => dispatch(startTimeSlice({
    taskId, start: getMySQLTimestamp(), comment: '', type: 'POMODORO'
  })),
  endTimeSlice: timeSliceId => dispatch(updateTimeSlice(timeSliceId, {
    end: getMySQLTimestamp()
  })),
  timerStarted: (startedAt, interval) => dispatch(timerStarted(startedAt, interval)),
  timerStopped: () => dispatch(timerStopped()),
  timerTick: () => dispatch(timerTick())
})

export default connect(mapStateToProps, mapDispatchToProps)(Clock)
