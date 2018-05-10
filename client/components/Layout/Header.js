import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { withRouter } from 'next/router';
import classNames from 'classnames';

const routes = [
  {
    label: 'home',
    href: '/'
  },
  {
    label: 'Add',
    href: '/add'
  },
  {
    label: 'Search',
    href: '/search'
  },
  {
    label: 'Browse',
    href: '/browse'
  }
];

const Header = styled.header`
  background-color: #333;
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
  &:hover {
    background-color: green;
    color: black;
  }
  ${({ router, route }) =>
    router.pathname === route.href &&
    `
    background: green;
  `};
`;

const Menu = ({ router }) => (
  <Header>
    <List>
      {routes.map(route => {
        return (
          <Link key={route.href} href={route.href}>
            <ListItem route={route} router={router}>
              {route.label}
            </ListItem>
          </Link>
        );
      })}
    </List>
  </Header>
);

export default withRouter(Menu);
