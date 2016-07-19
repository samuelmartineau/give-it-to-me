import React, {PropTypes} from 'react'
import {List, ListItem, MakeSelectable} from 'material-ui/List'
import Badge from 'material-ui/Badge'

const SelectableList = MakeSelectable(List)

export const menuItems = [
  {
    children: 'Home',
    value: '/',
    title: 'Dashboard'
  }, {
    children: 'Ajouter',
    value: '/add',
    title: 'Ajouter une bouteille'
  }, {
    children: 'Chercher',
    value: '/search',
    title: 'Trouver une bouteille'
  }, {
    children: 'Favoris',
    value: '/favorite',
    title: 'Favoris',
    rightChild: (favorite) => (<Badge badgeContent={favorite.length} primary />)
  }, {
    children: 'Parcourir',
    value: '/browse',
    title: 'Parcourir les bouteilles'
  }
]

const Menu = ({favorite, handleRequestChangeList, location}) => {
  return (
    <SelectableList value={location.pathname} onChange={handleRequestChangeList}>
      {menuItems.map((item, index) => <ListItem key={index} children={item.children} rightIcon={item.rightChild && item.rightChild(favorite)} value={item.value} />)}
    </SelectableList>
  )
}

Menu.propTypes = {
  handleRequestChangeList: PropTypes.func.isRequired
}

export default Menu
