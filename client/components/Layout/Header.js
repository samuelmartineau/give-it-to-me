import React from 'react';
import Link from 'next/link';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import styled from 'styled-components';
import { withRouter } from 'next/router';

const routes = [
  {
    label: 'Accueil',
    href: '/',
    icon: <HomeIcon />
  },
  {
    label: 'Ajouter',
    href: '/add',
    icon: <AddIcon />
  },
  {
    label: 'Rechercher',
    href: '/search',
    icon: <SearchIcon />
  },
  {
    label: 'Parcourir',
    href: '/browse',
    icon: <FolderOpenIcon />
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

type Props = {
  router: any
};

const Menu = ({ router }: Props) => (
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
