import React from 'react';
import classNames from 'class-names';

const Icon = ({ name, className, onClick }) => (
  <span
    onClick={onClick}
    className={classNames(`icon-${name}`, className || '')}
  />
);

export default Icon;
