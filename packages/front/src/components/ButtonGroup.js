import React from 'react';
import classNames from 'class-names';

const ButtonGroup = ({ className, children }) => (
  <div className={classNames('button-group', className)}>{ children }</div>
);

export default ButtonGroup;
