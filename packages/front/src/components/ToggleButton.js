import React from 'react';
import classNames from 'class-names';

const ToggleButton = ({
  label, onToggle, on, classOn,
}) => (
  <button type="button" onClick={onToggle} className={classNames('btn', on ? classOn : '')}>{ label }</button>
);

export default ToggleButton;
