import React from 'react';
import { Link } from 'react-router-dom';
import List, { ListItem } from 'material-ui/List';

const Menu = () => (
  <List>
    <ListItem>
      <Link to="/tournaments/create">Create Tournament</Link>
    </ListItem>
    <ListItem>
      <Link to="/tournaments">My Tournaments</Link>
    </ListItem>
  </List>
);

export default Menu;
