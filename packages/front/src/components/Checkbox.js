import React from 'react';
import Task from './Task';

const Checkbox = ({ onChange, checked }) => (
  <div className="custom-control custom-checkbox">
    <input
      onChange={onChange}
      type="checkbox"
      className="custom-control-input"
      checked={checked}
    />
  </div>
);

export default Checkbox;
