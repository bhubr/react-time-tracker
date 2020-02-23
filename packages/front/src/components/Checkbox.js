import React from 'react';
import Task from './Task';

const Checkbox = ({ onChange, checked }) => (
  <span className="custom-control custom-checkbox">
    <input
      onChange={onChange}
      type="checkbox"
      className="custom-control-input"
      checked={checked}
    />
  </span>
);

export default Checkbox;
