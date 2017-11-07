import React from "react";
import Link from "next/link";
import List, { ListItem } from "material-ui/List";

const Menu = () => (
  <List>
    <ListItem>
      <Link href="/">Home</Link>
    </ListItem>
    <ListItem>
      <Link href="/browse">Browse</Link>
    </ListItem>
  </List>
);

export default Menu;
