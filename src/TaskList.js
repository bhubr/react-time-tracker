import React from 'react'
import { List } from 'semantic-ui-react'

const TaskList = () => (
  <List divided verticalAlign='middle'>
    <List.Item>
      <List.Content>
        <List.Header as='a'>Créer une appli de gestion de tâches</List.Header>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Content>
        <List.Header as='a'>Faire le tri dans mes dépôts GitHub</List.Header>
      </List.Content>
    </List.Item>
    <List.Item>
      <List.Content>
        <List.Header as='a'>Faire le tri dans mes backups</List.Header>
      </List.Content>
    </List.Item>
  </List>
)

export default TaskList