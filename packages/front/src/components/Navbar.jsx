import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function Navbar({ logout }) {
  return (
    <Menu pointing secondary>
      <Menu.Item
        as={Link}
        to="/"
      >
        TrakT
      </Menu.Item>
      <Menu.Item
        name="workspaces"
        as={Link}
        to="/workspaces"
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="logout"
          onClick={logout}
        />
      </Menu.Menu>
    </Menu>
  )
}

export default Navbar;
