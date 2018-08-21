import React from 'react'
import { List } from 'semantic-ui-react'

const TaskList = props => (
  <List divided verticalAlign='middle'>
    {
      props.tasks.map(
        (task, index) =>
        <List.Item key={index}>
          <List.Content>
            <List.Header as='a'>{task.title}</List.Header>
          </List.Content>
        </List.Item>
      )
    }
  </List>
)

export default TaskList