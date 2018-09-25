import React from 'react'
import { connect } from 'react-redux'

import { TIMER_IDLE } from '../constants'
import { toggleFilter } from '../actions'
import Clock from './Clock'
import ButtonGroup from './ButtonGroup'
import ToggleButton from './ToggleButton'

const IdleClock = () => <span>--:--</span>

const PageHeader = ({ timer, toggleFilter, showCritical, showActive, showDone }) => (
  <div className="page-header">
    <h1 className="page-title">Time Tracker</h1>
    <ButtonGroup className="grow filter-buttons">
      <ToggleButton
        onToggle={() => toggleFilter('critical')}
        classOn="btn-red"
        label="Critical"
        on={showCritical} />
      <ToggleButton
        onToggle={() => toggleFilter('active')}
        classOn="btn-purple"
        label="Active"
        on={showActive} />
      <ToggleButton
        onToggle={() => toggleFilter('done')}
        classOn="btn-purple"
        label="Done"
        on={showDone} />
    </ButtonGroup>
    <div className="timer">
    {
      timer.status === TIMER_IDLE ? <IdleClock /> : <Clock />
    }
    </div>
  </div>
)

const mapStateToProps = state => ({
  timer: state.timer,
  showCritical: state.filters.critical,
  showActive: state.filters.active,
  showDone: state.filters.done
})

const mapDispatchToProps = dispatch => ({
  toggleFilter: key => dispatch(toggleFilter(key))
})

export default connect(mapStateToProps, mapDispatchToProps)(PageHeader)
