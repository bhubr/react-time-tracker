import React from 'react';
import classNames from 'class-names';
import { Button } from 'semantic-ui-react';
const ToggleButton = ({
  label, onToggle, on, classOn,
}) => (
  <Button
    onClick={onToggle} 
    className={classNames('btn', on ? classOn : '')}
  >
      { label }
  </Button>
);

export default ToggleButton;
