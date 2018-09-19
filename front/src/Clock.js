import React from 'react'
import formatTime from './formatTime'

const Clock = props => (
  <div className="timer">
    { props.timer
      ? <div>{ formatTime(props.timer.remainingTime) }</div>
      : <div>00:00</div>
    }
  </div>
)

export default Clock
