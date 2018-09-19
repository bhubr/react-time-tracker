import React from 'react'
import Icon from './Icon'
import Checkbox from './Checkbox'

const formatDatetime = datetime => {
  const date = datetime.substr(0, 10)
  const time = datetime.substr(11, 5)
  return `${date} ${time}`
}
const Task = ({ task, startTimeSlice, deleteTask, toggleDone }) => (
  <div className="task">
    <div className="task-header">
      <h5>{task.title}</h5>
      <Icon disabled={task.done} onClick={() => startTimeSlice(task.id)} name='stopwatch' />
      <Icon onClick={() => deleteTask(task.id)} name='bin' />
      <Checkbox task={task} toggleDone={ toggleDone } />
    </div>
    <div className="task-timeslices">
    {
      task.timeSlices
      ? task.timeSlices.map((ts, tsi) =>
        <div key={tsi}>{ formatDatetime(ts.datetimeStart) } {ts.comment}</div>
      )
      : 'no time slices'
    }
    </div>
  </div>
)

export default Task
