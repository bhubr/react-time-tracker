import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Header, List } from 'semantic-ui-react';
import Task from './Task';
import Icon from './Icon';
import { fetchAllTasks } from '../actions';
import { fetchProjects } from '../store/projects/actions';

class TaskList extends React.Component {
  componentDidMount() {
    const { fetchAllTasks, fetchProjects } = this.props;
    fetchAllTasks();
    fetchProjects();
  }

  render() {
    const { filters, tasks } = this.props;
    const { critical, active, done } = filters;
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
          tasks
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

TaskList.propTypes = {
  fetchAllTasks: PropTypes.func.isRequired,
  fetchProjects: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  tasks: state.tasks.items,
  filters: state.filters,
});

const mapDispatchToProps = { fetchAllTasks, fetchProjects };

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
