import React from 'react'
import { connect } from 'react-redux'
import formatTime from './helpers/formatTime'
import getMySQLTimestamp from './helpers/getMySQLTimestamp'
import getNowSeconds from './helpers/getNowSeconds'
import { TIMER_POMODORO, TIMER_SHORT_BREAK, TIMER_LONG_BREAK } from './constants'
import {
  startTimeSlice,
  startBreak,
  timerStarted,
  timerStopped,
  timerTick
} from './actions'

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
    const { timer, startTimeSlice, startBreak, timerStarted, timerTick, timerStopped } = this.props
    if (timer.remaining === 0 && timer.startedAt) {
      console.log('timer reaches 0')
      clearInterval(timer.interval)
      if (isPomodoro(timer.status)) {
        console.log('was pomo, start break')
        const startedAt = getNowSeconds()
        const interval = setInterval(timerTick, 1000)
        startBreak(startedAt, interval)
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
  render () {
    const { timer } = this.props
    return (
      <span>
      { formatTime(timer.remaining) }
      </span>
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
  timerStarted: (startedAt, interval) => dispatch(timerStarted(startedAt, interval)),
  timerStopped: () => dispatch(timerStopped()),
  timerTick: () => dispatch(timerTick())
})

export default connect(mapStateToProps, mapDispatchToProps)(Clock)
