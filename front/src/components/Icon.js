import React from 'react'
import classNames from 'class-names'

const Icon = ({ name, className, onClick }) => (
  <span
    onClick={ onClick }
    className={ classNames(`icon-${name}`, className ? className : '') }>
  </span>
)

export default Icon
