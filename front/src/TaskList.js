import React from 'react'
import Task from './Task'
import { connect } from 'react-redux'
import { fetchAllTasks } from './actions'

class TaskList extends React.Component {
  componentDidMount() {
    this.props.fetchAllTasks()
  }
  render() {
    return (
      <div className="accordion">
      {
        this.props.tasks.map(
          (task, index) => <Task
            key={index}
            task={task}
            toggleDone={this.props.toggleDone}
            deleteTask={this.props.deleteTask}
            startTimeSlice={this.props.startTimeSlice} />
        )
      }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  tasks: state.tasks.items
})

const mapDispatchToProps = dispatch => ({
  fetchAllTasks: () => dispatch(fetchAllTasks())
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)
