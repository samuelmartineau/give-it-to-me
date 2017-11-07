import React from "react";
import List, { ListItem } from "material-ui/List";

const Menu = () => (
  <List>
    <ListItem>
      <a href="/tournaments/create">Create Tournament</a>
    </ListItem>
    <ListItem>
      <a href="/tournaments">My Tournaments</a>
    </ListItem>
  </List>
);

export default Menu;
