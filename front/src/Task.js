import React from 'react'
import { connect } from 'react-redux'
import Icon from './Icon'
import Checkbox from './Checkbox'
import TaskInlineEdit from './TaskInlineEdit'
import getMySQLTimestamp from './helpers/getMySQLTimestamp'

import {
  updateTask,
  toggleTaskTitleEditing,
  setCurrentTask,
  deleteTask,
  startTimeSlice
} from './actions'

const formatDatetime = datetime => {
  const date = datetime.substr(0, 10)
  const time = datetime.substr(11, 5)
  return `${date} ${time}`
}
const Task = ({ task, currentTaskId, setCurrentTask, startTimeSlice, deleteTask, updateTask, inlineEditing, toggleTitleEditing }) => (
  <div className={ 'task' + (currentTaskId === task.id ? ' active' : '') }>
    <div className="task-header">
      <h5
        onClick={() => setCurrentTask(task.id)}
        onDoubleClick={() => toggleTitleEditing(task.id)}
      >
        {inlineEditing !== task.id
          ? task.title
          : <TaskInlineEdit task={task} />
        }
      </h5>
      <Icon disabled={task.done} onClick={() => startTimeSlice(task.id)} name='stopwatch' />
      <Icon onClick={() => deleteTask(task.id)} name='bin' />
      <Checkbox task={task} toggleDone={ () => updateTask({ ...task, done: ! task.done }) } />
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

const mapStateToProps = state => ({
  inlineEditing: state.tasks.inlineEditing,
  currentTaskId: state.tasks.currentTaskId
})

const mapDispatchToProps = dispatch => ({
  toggleTitleEditing: id => dispatch(toggleTaskTitleEditing(id)),
  startTimeSlice: taskId => dispatch(startTimeSlice({
    taskId, start: getMySQLTimestamp(), comment: '', type: 'POMODORO'
  })),
  updateTask: task => dispatch(updateTask(task)),
  deleteTask: taskId => dispatch(deleteTask(taskId)),
  setCurrentTask: taskId => dispatch(setCurrentTask(taskId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Task)
