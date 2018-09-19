import React from 'react'
import { connect } from 'react-redux'
import Icon from './Icon'
import Checkbox from './Checkbox'
import TaskInlineEdit from './TaskInlineEdit'
import { updateTask, toggleTaskTitleEditing, deleteTask } from './actions'

const formatDatetime = datetime => {
  const date = datetime.substr(0, 10)
  const time = datetime.substr(11, 5)
  return `${date} ${time}`
}
const Task = ({ task, startTimeSlice, deleteTask, updateTask, inlineEditing, toggleTitleEditing }) => (
  <div className="task">
    <div className="task-header">
      <h5 onClick={() => toggleTitleEditing(task.id)}>{inlineEditing !== task.id
        ? task.title
        : <TaskInlineEdit task={task} />
      }</h5>
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
  inlineEditing: state.tasks.inlineEditing
})

const mapDispatchToProps = dispatch => ({
  toggleTitleEditing: id => dispatch(toggleTaskTitleEditing(id)),
  updateTask: task => dispatch(updateTask(task)),
  deleteTask: taskId => dispatch(deleteTask(taskId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Task)
