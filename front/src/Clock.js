import React from 'react'
import { connect } from 'react-redux'
import formatTime from './helpers/formatTime'
import getNowSeconds from './helpers/getNowSeconds'
import { timerStarted, timerStopped, timerTick } from './actions'

class Clock extends React.Component {
  componentDidMount() {
    const { timerStarted, timerTick } = this.props
    const startedAt = getNowSeconds()
    const interval = setInterval(timerTick, 1000)
    timerStarted(startedAt, interval)
  }
  componentDidUpdate() {
    const { timer, timerStopped } = this.props
    if (timer.remaining === 0 && timer.startedAt) {
      clearInterval(timer.interval)
      timerStopped()
    }
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
  timerStarted: (startedAt, interval) => dispatch(timerStarted(startedAt, interval)),
  timerStopped: () => dispatch(timerStopped()),
  timerTick: () => dispatch(timerTick())
})

export default connect(mapStateToProps, mapDispatchToProps)(Clock)
