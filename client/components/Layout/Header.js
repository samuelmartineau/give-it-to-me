import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { withRouter } from 'next/router';

const routes = [
  {
    label: 'home',
    href: '/',
    icon: 'home'
  },
  {
    label: 'Add',
    href: '/add',
    icon: 'add'
  },
  {
    label: 'Search',
    href: '/search',
    icon: 'search'
  },
  {
    label: 'Browse',
    href: '/browse',
    icon: 'folder_open'
  }
];

const Header = styled.header`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.onPrimary};
  user-select: none;
`;
const List = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  list-style-type: none;
`;
const ListItem = styled.li`
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  cursor: pointer;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${props => props.theme.colors.primaryVarient};
    color: ${props => props.theme.colors.onPrimary};
  }
  ${({ router, route, theme }) =>
    router.pathname === route.href &&
    `
    background: ${theme.colors.secondary};
    color: ${theme.colors.onSecondary};
  `};
`;
const ListItemIcon = styled.i`
  font-size: 30px;
  padding: 0 2px;
`;
const ListItemName = styled.span`
  ${props => props.theme.media.handheld`
display: none;
`};
`;

const Menu = ({ router }) => (
  <Header>
    <List>
      {routes.map(route => {
        return (
          <Link key={route.href} href={route.href}>
            <ListItem route={route} router={router}>
              <ListItemIcon className="material-icons">
                {route.icon}
              </ListItemIcon>
              <ListItemName>{route.label}</ListItemName>
            </ListItem>
          </Link>
        );
      })}
    </List>
  </Header>
);

export default withRouter(Menu);
