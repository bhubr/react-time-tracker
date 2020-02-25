import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Form, Input, Button } from 'semantic-ui-react';
import TaskEdit from '../TaskEdit';
import ProjectList from '../ProjectList';
import WorkspaceList from '../WorkspaceList';
import ProjectEdit from '../ProjectEdit';
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
    <Grid className="Workspaces" padded>
      <Grid.Row>
        <Grid.Column>
          <Form onSubmit={handleSubmit}>
            <Input id="title" name="title" placeholder="Workspace name" onChange={handleChange} />
            <Button color="teal" type="submit">Create</Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <TaskEdit />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <WorkspaceList />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <ProjectEdit />
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
