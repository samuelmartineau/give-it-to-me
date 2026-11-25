import React, { FC } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import HomeIcon from '@mui/icons-material/HomeRounded';
import AddIcon from '@mui/icons-material/AddCircleRounded';
import SearchIcon from '@mui/icons-material/SearchRounded';
import GridIcon from '@mui/icons-material/GridViewRounded';
import WineBarIcon from '@mui/icons-material/WineBarRounded';
import styled, { css } from 'styled-components';

type RouteType = {
  label: string;
  href: '/' | '/add' | '/search' | '/browse';
  icon: React.ReactElement;
  primary?: boolean;
};

const routes: RouteType[] = [
  { label: 'Accueil', href: '/', icon: <HomeIcon /> },
  { label: 'Ajouter', href: '/add', icon: <AddIcon />, primary: true },
  { label: 'Rechercher', href: '/search', icon: <SearchIcon /> },
  { label: 'Parcourir', href: '/browse', icon: <GridIcon /> },
];

const Bar = styled.header`
  position: sticky;
  top: 0;
  z-index: 9;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.onPrimary};
  box-shadow: 0 2px 10px rgba(40, 10, 20, 0.25);
  user-select: none;
`;

const Inner = styled.div`
  max-width: ${({ theme }) => theme.size.maxWidth};
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 0 32px;
  min-height: 76px;

  @media (max-width: 760px) {
    padding: 0 4px;
    min-height: 0;
  }
`;

const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  color: inherit;
  text-decoration: none;
  font-size: 1.45rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  white-space: nowrap;

  & svg {
    font-size: 2rem;
  }

  @media (max-width: 760px) {
    display: none;
  }
`;

const Nav = styled.nav`
  flex: 1;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;

  @media (max-width: 760px) {
    gap: 2px;
    justify-content: space-between;
  }
`;

const Item = styled.li`
  @media (max-width: 760px) {
    flex: 1;
  }
`;

const NavLink = styled(Link)<{ $isActive: boolean; $primary?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: ${({ theme }) => theme.size.tapTarget};
  padding: 0 18px;
  border-radius: 999px;
  color: ${({ theme }) => theme.colors.onPrimary};
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 600;
  white-space: nowrap;
  transition:
    background-color 0.15s,
    color 0.15s;

  & svg {
    font-size: 1.7rem;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.14);
  }

  ${({ $isActive }) =>
    $isActive &&
    css`
      background-color: rgba(255, 255, 255, 0.2);
    `}

  ${({ $primary, $isActive, theme }) =>
    $primary &&
    css`
      background-color: ${$isActive ? theme.colors.focus : '#ffffff'};
      color: ${theme.colors.primaryDark};
      box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);

      &:hover {
        background-color: ${theme.colors.focus};
      }
    `}

  @media (max-width: 760px) {
    flex-direction: column;
    gap: 2px;
    padding: 8px 2px 10px;
    border-radius: 12px;
    margin: 6px 0;
    font-size: 0.9rem;

    & svg {
      font-size: 2rem;
    }
  }
`;

const Menu: FC = () => {
  const location = useLocation();

  return (
    <Bar>
      <Inner>
        <Brand to="/">
          <WineBarIcon />
          Ma cave
        </Brand>
        <Nav aria-label="Menu principal">
          <List>
            {routes.map((route) => {
              const isActive =
                route.href === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(route.href);
              return (
                <Item key={route.href}>
                  <NavLink
                    to={route.href}
                    $isActive={isActive}
                    $primary={route.primary}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {route.icon}
                    <span>{route.label}</span>
                  </NavLink>
                </Item>
              );
            })}
          </List>
        </Nav>
      </Inner>
    </Bar>
  );
};

export default Menu;
