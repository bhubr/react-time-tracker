import React from 'react';
import PropTypes from 'prop-types';

function numSlices(task) {
  const { timeboxes } = task;
  return Array.isArray(timeboxes)
    ? timeboxes.length
    : 0;
}

const TaskBadge = ({ task }) => (
  <span>
    { task.title }
    <span className={`badge${numSlices(task) ? ' purple' : ''}`}>
      { numSlices(task) }
    </span>
  </span>
);

TaskBadge.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string.isRequired,
    timeboxes: PropTypes.array,
  }).isRequired,
};

export default TaskBadge;
