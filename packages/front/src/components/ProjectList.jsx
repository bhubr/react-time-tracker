import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchProjects as fetchProjectsAction } from '../store/projects/actions';

class ProjectList extends React.Component {
  componentDidMount() {
    const { fetchProjects } = this.props;
    fetchProjects();
  }

  render() {
    const { projects } = this.props;
    return (
      <div className="ProjectList">
        {
        projects.map((project) => (
          <div key={project.id}>
            <h4>{project.title}</h4>
          </div>
        ))
      }
      </div>
    );
  }
}

ProjectList.propTypes = {
  fetchProjects: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  projects: state.projects.items,
});

const mapDispatchToProps = {
  fetchProjects: fetchProjectsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
