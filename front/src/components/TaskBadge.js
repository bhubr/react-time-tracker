import React from 'react'

const TaskBadge = ({ task }) => (
  <span>{ task.title }
    <span className={ "badge" + (task.timeSlices.length ? ' purple' : '') }>
      { task.timeSlices.length }
    </span>
  </span>
)

export default TaskBadge
