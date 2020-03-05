import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Select } from 'semantic-ui-react';
import { createTask } from '../actions';

function TaskEdit({ projectOptions, createTask }) {
  const [title, setTitle] = useState('');
  const [projectId, setProjectId] = useState('');

  const handleChangeTitle = ({ target }) => setTitle(target.value);
  const handleChangeProject = (e, { value }) => setProjectId(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      return;
    }
    setTitle('');
    setProjectId('');
    createTask(title, projectId);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Input
          placeholder="Task title"
          onChange={handleChangeTitle}
          value={title}
        />
        <Select
          onChange={handleChangeProject}
          value={projectId}
          options={projectOptions}
        />
        <Button className="ml" color="teal" type="submit">Submit</Button>
      </Form.Group>
    </Form>
  );
}

const mapProjectFields = ({ id, title }) => ({ key: id, value: id, text: title });
const getProjectOptions = (projects) => {
  const defaultChoice = [{ key: 0, value: '', text: '-' }];
  return defaultChoice.concat(projects.items.map(mapProjectFields));
};

const mapStateToProps = ({ projects }) => ({
  projectOptions: getProjectOptions(projects),
});

const mapDispatchToProps = {
  createTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskEdit);
