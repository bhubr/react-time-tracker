import React from 'react'
import { Statistic } from 'semantic-ui-react'
import formatTime from './formatTime'

const Clock = props => (
  <Statistic>
    { props.timer
      ? <Statistic.Value>{ formatTime(props.timer.remainingTime) }</Statistic.Value>
      : <Statistic.Value>00:00</Statistic.Value>
    }
  </Statistic>
)

export default Clock
