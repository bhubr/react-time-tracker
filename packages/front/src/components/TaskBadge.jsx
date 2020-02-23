import React from 'react';
import PropTypes from 'prop-types';
import { Label } from 'semantic-ui-react';

function numSlices(task) {
  const { timeboxes } = task;
  return Array.isArray(timeboxes)
    ? timeboxes.length
    : 0;
}

const TaskBadge = ({ task }) => (
  <span>
    { task.title }
    <Label className="ml" size="mini" color={numSlices(task) ? 'purple' : undefined}>
      { numSlices(task) }
    </Label>
  </span>
);

TaskBadge.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string.isRequired,
    timeboxes: PropTypes.array,
  }).isRequired,
};

export default TaskBadge;
