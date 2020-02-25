/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withState, compose } from 'recompose';
import classNames from 'class-names';
import { List, Header } from 'semantic-ui-react';
import Icon from './Icon';
import Checkbox from './Checkbox';
import TaskBadge from './TaskBadge';
import TaskInlineEdit from './TaskInlineEdit';
import PomoInlineEdit from './PomoInlineEdit';
import getMySQLTimestamp from '../helpers/getMySQLTimestamp';
import taskPropTypes from '../prop-types/task';

import {
  updateTask,
  toggleTaskTitleEditing,
  togglePomoCommentEditing,
  setCurrentTask,
  deleteTask,
  startTimeSlice,
} from '../actions';

const formatDatetime = (datetime) => {
  const date = datetime.substr(0, 10);
  const time = datetime.substr(11, 5);
  return `${date} ${time}`;
};

const getActiveClass = (currentTaskId, { id }) => (currentTaskId === id ? 'Task__title--active' : '');
const getChevronDirection = (expanded) => `chevron-${expanded ? 'up' : 'down'}`;
const enhance = withState('expanded', 'toggleExpanded', false);
const Task = ({
  task,
  expanded,
  toggleExpanded,
  currentTaskId,
  setCurrentTask,
  startTimeSlice,
  deleteTask,
  updateTask,
  inlineTaskEditing,
  inlinePomoEditing,
  toggleTaskTitleEditing,
  togglePomoCommentEditing,
}) => (
  <List.Item className="Task">
    <List.Content floated='right'>
      <Icon disabled={task.done} onClick={() => startTimeSlice(task.id)} name="stopwatch" />
      <Icon onClick={() => deleteTask(task.id)} name="bin" />
      <Checkbox checked={task.critical} onChange={() => updateTask({ ...task, critical: !task.critical })} />
      <Checkbox checked={task.active} onChange={() => updateTask({ ...task, active: !task.active })} />
      <Checkbox checked={task.done} onChange={() => updateTask({ ...task, done: !task.done })} />
    </List.Content>
    <List.Content>
      <Icon onClick={() => toggleExpanded(!expanded)} name={getChevronDirection(expanded)} />
      <div
        onClick={() => setCurrentTask(task.id)}
        onDoubleClick={() => toggleTaskTitleEditing(task.id)}
        className={classNames('Task__title', getActiveClass(currentTaskId, task))}
      >
        {inlineTaskEditing !== task.id
          ? <TaskBadge task={task} />
          : <TaskInlineEdit task={task} />}
      </div>
      <div className="task-timeboxes">
        {
        expanded && task.timeboxes
        && task.timeboxes.map((ts, tsi) => (
          <div key={tsi}>
            {
            formatDatetime(ts.start)
  }
  &nbsp;
            <span onDoubleClick={() => togglePomoCommentEditing(ts.id)}>
              {inlinePomoEditing !== ts.id
                ? ts.comment || 'N/A'
                : <PomoInlineEdit pomo={ts} />}
            </span>
          </div>
        ))
      }
      </div>
    </List.Content>
  </List.Item>
);

Task.propTypes = {
  task: taskPropTypes,
};

const mapStateToProps = (state) => ({
  inlineTaskEditing: state.tasks.inlineTaskEditing,
  inlinePomoEditing: state.tasks.inlinePomoEditing,
  currentTaskId: state.tasks.currentTaskId,
});

const mapDispatchToProps = (dispatch) => ({
  toggleTaskTitleEditing: (id) => dispatch(toggleTaskTitleEditing(id)),
  togglePomoCommentEditing: (id) => dispatch(togglePomoCommentEditing(id)),
  startTimeSlice: (taskId) => dispatch(startTimeSlice({
    taskId, start: getMySQLTimestamp(), comment: '', type: 'POMODORO',
  })),
  updateTask: (task) => dispatch(updateTask(task)),
  deleteTask: (taskId) => dispatch(deleteTask(taskId)),
  setCurrentTask: (taskId) => dispatch(setCurrentTask(taskId)),
});

export default compose(
  enhance,
  connect(mapStateToProps, mapDispatchToProps),
)(Task);
