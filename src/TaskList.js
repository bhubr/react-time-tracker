import React from 'react'
import Task from './Task'

const TaskList = props => (
  <div className="accordion">
    {
      props.tasks.map(
        (task, index) => <Task
          key={index}
          task={task}
          toggleDone={props.toggleDone}
          deleteTask={props.deleteTask}
          startTimeSlice={props.startTimeSlice} />
      )
    }
  </div>
)

export default TaskList