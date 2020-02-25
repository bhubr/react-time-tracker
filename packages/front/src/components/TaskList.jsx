/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Header, List } from 'semantic-ui-react';
import Task from './Task';
import { fetchTodaysTasks as fetchTodaysTasksAction } from '../store/tasks/actions';
import { fetchProjects as fetchProjectsAction } from '../store/projects/actions';

class TaskList extends React.Component {
  componentDidMount() {
    const { fetchTodaysTasks, fetchProjects } = this.props;
    fetchTodaysTasks();
    fetchProjects();
  }

  render() {
    const { filters, tasks } = this.props;
    const { critical, active, done } = filters;
    return (
      <List>
        <List.Item>
          <List.Content floated="right">
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
  fetchTodaysTasks: PropTypes.func.isRequired,
  fetchProjects: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  tasks: state.tasks.todaysItems,
  filters: state.filters,
});

const mapDispatchToProps = {
  fetchTodaysTasks: fetchTodaysTasksAction,
  fetchProjects: fetchProjectsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
