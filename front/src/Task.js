import React from 'react'
import { connect } from 'react-redux'
import Icon from './Icon'
import Checkbox from './Checkbox'
import TaskInlineEdit from './TaskInlineEdit'
import PomoInlineEdit from './PomoInlineEdit'
import getMySQLTimestamp from './helpers/getMySQLTimestamp'

import {
  updateTask,
  toggleTaskTitleEditing,
  togglePomoCommentEditing,
  setCurrentTask,
  deleteTask,
  startTimeSlice
} from './actions'

const formatDatetime = datetime => {
  const date = datetime.substr(0, 10)
  const time = datetime.substr(11, 5)
  return `${date} ${time}`
}
const Task = ({
  task,
  currentTaskId,
  setCurrentTask,
  startTimeSlice,
  deleteTask,
  updateTask,
  inlineTaskEditing,
  inlinePomoEditing,
  toggleTaskTitleEditing,
  togglePomoCommentEditing
}) => (
  <div className={ 'task' + (currentTaskId === task.id ? ' active' : '') }>
    <div className="task-header">
      <h5
        onClick={() => setCurrentTask(task.id)}
        onDoubleClick={() => toggleTaskTitleEditing(task.id)}
      >
        {inlineTaskEditing !== task.id
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
        <div key={tsi}>{
          formatDatetime(ts.start) }&nbsp;
          <span onDoubleClick={() => togglePomoCommentEditing(ts.id)}>
          {inlinePomoEditing !== ts.id
          ? ts.comment || 'N/A'
          : <PomoInlineEdit pomo={ts} />
        }</span>
        </div>
      )
      : 'no time slices'
    }
    </div>
  </div>
)

const mapStateToProps = state => ({
  inlineTaskEditing: state.tasks.inlineTaskEditing,
  inlinePomoEditing: state.tasks.inlinePomoEditing,
  currentTaskId: state.tasks.currentTaskId
})

const mapDispatchToProps = dispatch => ({
  toggleTaskTitleEditing: id => dispatch(toggleTaskTitleEditing(id)),
  togglePomoCommentEditing: id => dispatch(togglePomoCommentEditing(id)),
  startTimeSlice: taskId => dispatch(startTimeSlice({
    taskId, start: getMySQLTimestamp(), comment: '', type: 'POMODORO'
  })),
  updateTask: task => dispatch(updateTask(task)),
  deleteTask: taskId => dispatch(deleteTask(taskId)),
  setCurrentTask: taskId => dispatch(setCurrentTask(taskId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Task)
