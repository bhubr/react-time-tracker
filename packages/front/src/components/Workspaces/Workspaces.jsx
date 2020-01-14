import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import workspacePropTypes from '../../prop-types/workspace';
import { createWorkspace as createWorkspaceAction } from '../../store/workspaces/actions';
import {
  createProject as createProjectAction,
  importProjects as importProjectsAction,
} from '../../store/projects/actions';

function Workspaces({
  workspaces, createWorkspace, createProject, importProjects, user, importableRepos,
}) {
  const [title, setTitle] = useState('');
  const [workspaceId, selectWorkspace] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    setTitle(value);
  };

  const handleSelectWorkspace = (e) => {
    const { value } = e.target;
    selectWorkspace(value);
  };

  const handleSubmitWorkspace = (e) => {
    e.preventDefault();
    createWorkspace({ title });
  };

  const handleSubmitProject = (e) => {
    e.preventDefault();
    createProject({ title, workspaceId });
  };

  const importBitbucket = () => {
    importProjects(user.bitbucket.username, user.accessToken);
  };

  return (
    <div className="Workspaces">
      <ul>
        {
          workspaces.map((workspace) => (
            <li key={workspace.id}>{workspace.title}</li>
          ))
        }
      </ul>
      <h4>New workspace</h4>
      <form onSubmit={handleSubmitWorkspace}>
        <label htmlFor="title">
          Title
          <input id="title" name="title" onChange={handleChange} />
        </label>
        <button type="submit">Create</button>
      </form>
      <h4>New project</h4>
      <form onSubmit={handleSubmitProject}>
        <label htmlFor="title">
          Title
          <input id="title" name="title" onChange={handleChange} />
        </label>
        <label htmlFor="workspace">
          Workspace
          <select value={workspaceId} onChange={handleSelectWorkspace}>
            <option value="">&mdash;</option>
            {
              workspaces.map((workspace) => (
                <option key={workspace.id} value={workspace.id}>{workspace.title}</option>
              ))
            }
          </select>
        </label>
        <button type="submit">Create</button>
      </form>
      <button type="button" onClick={importBitbucket}>Import</button>
      <ul>
        {
          importableRepos.map((repo) => (
            <li key={repo.uuid}>{repo.name}</li>
          ))
        }
      </ul>
    </div>
  );
}

Workspaces.propTypes = {
  workspaces: PropTypes.arrayOf(workspacePropTypes).isRequired,
  createWorkspace: PropTypes.func.isRequired,
  createProject: PropTypes.func.isRequired,
  importProjects: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  importableRepos: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

const mapStateToProps = ({ workspaces, auth, projects }) => ({
  workspaces: workspaces.items,
  user: auth.user,
  importableRepos: projects.importableRepos,
});

const mapDispatchToProps = {
  createWorkspace: createWorkspaceAction,
  createProject: createProjectAction,
  importProjects: importProjectsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Workspaces);
