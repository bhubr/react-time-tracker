import React from 'react'
import { Statistic } from 'semantic-ui-react'

const Clock = props => (
  <Statistic>
    <Statistic.Value>{props.remainingTime}</Statistic.Value>
  </Statistic>
)

export default Clock
