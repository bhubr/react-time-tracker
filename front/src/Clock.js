import React from 'react'
import { connect } from 'react-redux'
import formatTime from './helpers/formatTime'
import getNowSeconds from './helpers/getNowSeconds'
import { timerStarted, timerTick } from './actions'

class Clock extends React.Component {
  componentDidMount() {
    const { timerStarted, timerTick } = this.props
    const startedAt = getNowSeconds()
    const interval = setInterval(timerTick, 1000)
    console.log('mount clock', Date.now(), startedAt, interval)
    timerStarted(startedAt, interval)
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
  timerTick: () => dispatch(timerTick())
})

export default connect(mapStateToProps, mapDispatchToProps)(Clock)
