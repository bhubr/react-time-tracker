import React, { Component } from 'react'
import { Menu, Segment } from 'semantic-ui-react'

function Navbar({ logout }) {
  return (
    <Menu pointing secondary>
      <Menu.Item
        active={true}
        onClick={() => {}}
      >
        TrakT
      </Menu.Item>
      <Menu.Menu position='right'>
        <Menu.Item
          name='logout'
          onClick={logout}
        />
      </Menu.Menu>
    </Menu>
  )
}

export default Navbar;
