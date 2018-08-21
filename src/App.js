import React, { Component } from 'react';
import { Container } from 'semantic-ui-react'
import TaskList from './TaskList';

class App extends Component {
  render() {
    return (
      <Container>
        <TaskList />
      </Container>
    );
  }
}

export default App;
