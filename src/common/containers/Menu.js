import React, { Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { List, ListItem, MakeSelectable} from 'material-ui';
import Badge from 'material-ui/Badge';

const SelectableList = MakeSelectable(List);

export const menuItems = [
    {children: 'Home', value: '/', title: 'Dashboard'},
    {children: 'Ajouter', value: '/add', title: 'Ajouter une bouteille'},
    {children: 'Chercher', value: '/search', title: 'Trouver une bouteille'},
    {children: 'Panier', value: '/basket', title: 'Panier', rightChild: (that) => (<Badge
      badgeContent={that.props.basket.length}
      primary={true}
    />)}
];

class Menu extends Component {

    render() {
        const {handleRequestChangeList, location} = this.props;
        return (
            <SelectableList
                value={location.pathname}
                onChange={handleRequestChangeList.bind(this)}
                >
              {menuItems.map((item, index) =>
                  <ListItem
                    key={index}
                    children={item.children}
                    rightIcon={item.rightChild && item.rightChild(this)}
                    value={item.value} />
              )}
            </SelectableList>
        );
    }
}

Menu.propTypes = {
    handleRequestChangeList: PropTypes.func.isRequired
}

export default connect(state => {
    return {
        basket: state.basket
    }
})(Menu);
