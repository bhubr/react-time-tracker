import React from 'react'
import { connect } from 'react-redux'
import Task from './Task'
import Icon from './Icon'
import { fetchAllTasks } from '../actions'

class TaskList extends React.Component {
  componentDidMount() {
    this.props.fetchAllTasks()
  }
  render() {
    const { critical, active, done } = this.props.filters
    return (
      <div className="accordion">
        <div className="task-header task-header-row">
          <Icon name="chevron-down" className="hidden" onClick={ () => { }} />
          <h5 className="grow">Name</h5>
          <div className="checkbox-header">C</div>
          <div className="checkbox-header">A</div>
          <div className="checkbox-header">D</div>
        </div>
      {
        this.props.tasks
        .filter(t => (!critical || t.critical) && (!active || t.active) && (done || !t.done))
        .map(
          (task, index) => <Task
            key={index}
            task={task} />
        )
      }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  tasks: state.tasks.items,
  filters: state.filters
})

const mapDispatchToProps = dispatch => ({
  fetchAllTasks: () => dispatch(fetchAllTasks())
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)
