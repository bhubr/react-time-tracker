import React from 'react'
import { Icon, List, Radio } from 'semantic-ui-react'

const TaskList = props => (
  <List divided verticalAlign='middle'>
    {
      props.tasks.map(
        (task, index) =>
        <List.Item key={index}>
          <List.Content floated='right'>
            <Icon disabled={task.done} onClick={() => props.startTimeSlice(index)} name='stopwatch' />
            <Icon onClick={() => props.deleteTask(index)} name='trash alternate' />
            <Radio toggle checked={task.done} onChange={() => props.toggleDone(index)} />
          </List.Content>
          <List.Content>
            <List.Header as='a'>{task.title}</List.Header>
          </List.Content>
        </List.Item>
      )
    }
  </List>
)

export default TaskList