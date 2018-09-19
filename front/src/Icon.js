import React from 'react'

const Icon = ({ name, onClick }) => <span onClick={onClick} className={'icon-' + name}></span>

export default Icon
