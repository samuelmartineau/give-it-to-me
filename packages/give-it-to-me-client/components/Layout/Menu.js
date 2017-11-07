import React from "react";
import Link from "next/link";
import List, { ListItem } from "material-ui/List";

const routes = [
  {
    label: "home",
    href: "/"
  },
  {
    label: "Add",
    href: "/add"
  },
  {
    label: "Search",
    href: "/search"
  },
  {
    label: "Browse",
    href: "/browse"
  }
];

const Menu = () => (
  <List>
    {routes.map(route => (
      <ListItem key={route.href}>
        <Link href={route.href}>
          <a>{route.label}</a>
        </Link>
      </ListItem>
    ))}
  </List>
);

export default Menu;
