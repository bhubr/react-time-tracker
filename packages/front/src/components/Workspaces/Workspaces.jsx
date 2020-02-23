import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, List } from 'semantic-ui-react';
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
    <Grid className="Workspaces">
      <Grid.Row>
        <Grid.Column>
          <List>
            {
              workspaces.map((workspace) => (
                <List.Item key={workspace.id}>
                  <List.Content>{workspace.title}</List.Content>
                </List.Item>
              ))
            }
          </List>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">
              Title
              <input id="title" name="title" onChange={handleChange} />
            </label>
            <button type="submit">Create</button>
          </form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
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
