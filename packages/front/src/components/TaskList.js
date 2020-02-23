import React from 'react';
import { connect } from 'react-redux';
import { Grid, Header, List } from 'semantic-ui-react';
import Task from './Task';
import Icon from './Icon';
import { fetchAllTasks } from '../actions';

class TaskList extends React.Component {
  componentDidMount() {
    this.props.fetchAllTasks();
  }

  render() {
    const { critical, active, done } = this.props.filters;
    return (
      <List>
        <List.Item>
          <List.Content floated='right'>
            <span className="checkbox-header">C</span>
            <span className="checkbox-header">A</span>
            <span className="checkbox-header">D</span>
          </List.Content>
          <List.Content>
            <Header as="h4">Name</Header>
          </List.Content>
        </List.Item>
          {
            this.props.tasks
              .filter((t) => (!critical || t.critical) && (!active || t.active) && (done || !t.done))
              .map(
                (task, index) => (
                  <Task
                    key={index}
                    task={task}
                  />
                ),
              )
          }
      </List>
    );
  }
}

const mapStateToProps = (state) => ({
  tasks: state.tasks.items,
  filters: state.filters,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllTasks: () => dispatch(fetchAllTasks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
