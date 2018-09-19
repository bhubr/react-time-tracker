import React from 'react'
import { connect } from 'react-redux'
import Clock from './Clock'
import { TIMER_IDLE } from './constants'
const IdleClock = () => <span>--:--</span>

const PageHeader = ({ timer }) => (
  <div className="page-header">
    <h1 className="page-title">Time Tracker</h1>
    <div className="timer">
    {
      timer.status === TIMER_IDLE ? <IdleClock /> : <Clock />
    }
    </div>
  </div>
)

const mapStateToProps = state => ({
  timer: state.timer
})

export default connect(mapStateToProps)(PageHeader)
