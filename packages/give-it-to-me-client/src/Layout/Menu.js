import React from "react";
import List, { ListItem } from "material-ui/List";

const Menu = () => (
  <List>
    <ListItem>
      <a href="/">Home</a>
    </ListItem>
    <ListItem>
      <a href="/browse">Browse</a>
    </ListItem>
  </List>
);

export default Menu;
