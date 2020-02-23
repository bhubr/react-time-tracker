import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Select, Button } from 'semantic-ui-react';
import { createProject } from '../store/projects/actions';

function ProjectEdit({ createProject, workspaces }) {
  const [title, setTitle] = useState('');
  const [workspaceId, setWorkspaceId] = useState(0);

  const handleChangeTitle = ({ target }) => setTitle(target.value);
  const handleChangeWorkspace = (e, { value }) => setWorkspaceId(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !workspaceId) {
      return;
    }
    setTitle('');
    createProject({ title, workspaceId });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Input
          placeholder="Project title"
          onChange={handleChangeTitle}
          value={title}
          required
        />
        <Select
          options={workspaces}
          onChange={handleChangeWorkspace}
        />
        <Button className="ml" color="teal" type="submit">Submit</Button>
      </Form.Group>
    </Form>
  );
}

const mapOptions = (workspaces) => [{ id: 0, title: '-' }, ...workspaces]
  .map(
    ({ id, title }) => ({ key: id, value: id, text: title }),
  );

const mapStateToProps = ({ workspaces }) => ({ workspaces: mapOptions(workspaces.items) });

const mapDispatchToProps = (dispatch) => ({
  createProject: (title) => dispatch(createProject(title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectEdit);
