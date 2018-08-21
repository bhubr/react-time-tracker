import React from 'react'
import { List } from 'semantic-ui-react'

const tasks = [
  {
    title: 'Créer une appli de gestion de tâches',
    done: false
  },
  {
    title: 'Faire le tri dans mes dépôts GitHub',
    done: false
  },
  {
    title: 'Faire le tri dans mes backups',
    done: false
  }
]

const TaskList = () => (
  <List divided verticalAlign='middle'>
    {
      tasks.map(
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