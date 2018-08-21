import React from 'react'
import { Statistic } from 'semantic-ui-react'
import formatTime from './formatTime'

const Clock = props => (
  <Statistic>
    <Statistic.Value>{ formatTime(props.remainingTime) }</Statistic.Value>
  </Statistic>
)

export default Clock
