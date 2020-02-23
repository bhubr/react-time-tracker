import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button } from 'semantic-ui-react';
import { createTask } from '../actions';

function TaskEdit({ createTask }) {
  const [title, setTitle] = useState('');

  const handleChange = ({ target }) => setTitle(target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      return;
    }
    setTitle('');
    createTask(title);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Input
          placeholder="Task title"
          onChange={handleChange}
          value={title}
        />
        <Button className="ml" color="teal" type="submit">Submit</Button>
      </Form.Group>
    </Form>
  );
}

const mapDispatchToProps = (dispatch) => ({
  createTask: (title) => dispatch(createTask(title)),
});

export default connect(null, mapDispatchToProps)(TaskEdit);
