import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import workspacePropTypes from '../../prop-types/workspace';
import { createWorkspace as createWorkspaceAction } from '../../store/workspaces/actions';

function Workspaces({ workspaces, createWorkspace }) {
  const [title, setTitle] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    setTitle(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createWorkspace({ title });
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
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">
          Title
          <input id="title" name="title" onChange={handleChange} />
        </label>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

Workspaces.propTypes = {
  workspaces: PropTypes.arrayOf(workspacePropTypes).isRequired,
  createWorkspace: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  workspaces: state.workspaces.items,
});

const mapDispatchToProps = {
  createWorkspace: createWorkspaceAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Workspaces);
