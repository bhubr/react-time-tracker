import React from 'react'
import Task from './Task';

const Checkbox = ({ toggleDone, task }) => <div className="custom-control custom-checkbox">
  <input onChange={ () => toggleDone(task.id) } type="checkbox" className="custom-control-input" id="customCheck1" checked={task.done} />
</div>

export default Checkbox
