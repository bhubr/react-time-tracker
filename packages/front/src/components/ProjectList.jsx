import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchWorkspaces as fetchWorkspacesAction } from '../store/workspaces/actions';
import workspacePropTypes from '../prop-types/workspace';

class ProjectList extends React.Component {
  componentDidMount() {
    const { fetchWorkspaces } = this.props;
    fetchWorkspaces();
  }

  render() {
    const { workspaces } = this.props;
    return (
      <div className="ProjectList">
        {
        workspaces.map((workspace) => (
          <div key={workspace.id}>
            <h4>{workspace.title}</h4>
            <ul>
              {workspace.projects.map((project) => (
                <li key={project.id}>{project.title}</li>
              ))}
            </ul>
          </div>
        ))
      }
      </div>
    );
  }
}

ProjectList.propTypes = {
  workspaces: PropTypes.arrayOf(workspacePropTypes).isRequired,
  fetchWorkspaces: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  workspaces: state.workspaces.items,
});

const mapDispatchToProps = {
  fetchWorkspaces: fetchWorkspacesAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
