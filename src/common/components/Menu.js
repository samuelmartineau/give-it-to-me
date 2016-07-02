import React, {PropTypes} from 'react'
import {List, ListItem, MakeSelectable} from 'material-ui'
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
    children: 'Panier',
    value: '/basket',
    title: 'Panier',
    rightChild: (basket) => (<Badge badgeContent={basket.length} primary />)
  }
]

const Menu = ({basket, handleRequestChangeList, location}) => {
  return (
    <SelectableList value={location.pathname} onChange={handleRequestChangeList}>
      {menuItems.map((item, index) => <ListItem key={index} children={item.children} rightIcon={item.rightChild && item.rightChild(basket)} value={item.value} />)}
    </SelectableList>
  )
}

Menu.propTypes = {
  handleRequestChangeList: PropTypes.func.isRequired
}

export default Menu
