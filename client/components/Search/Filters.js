// @flow
import React from 'react';
import { connect } from 'react-redux';
import { getWinesFiltered } from '~/client/store/';
import { WineCardConnected } from '../Wine/WineCardConnected';
import config from '~/config';
const { WINE_TYPES_ALL, WINE_CATEGORIES_ALL } = config.wineTypes;

type Props = {};

export class Filters extends React.Component {
  render() {
    console.log(this.props.filters);
    return (
      <div>
        Filters
        <div>
          <p>Couleur</p>
          {WINE_TYPES_ALL.map(type => {
            return (
              <label key={type.id}>
                <input
                  type="checkbox"
                  onClick={this.props.updateFilter}
                  name="type"
                  value={type.id}
                />
                {type.label}
              </label>
            );
          })}
          <p>Texture</p>
          {WINE_CATEGORIES_ALL.map(category => {
            return (
              <label key={category.id}>
                <input type="checkbox" name="category" value={category.id} />
                {category.label}
              </label>
            );
          })}
        </div>
      </div>
    );
  }
}

export const FiltersConnected = connect(
  state => ({
    filters: state.search
  }),
  dispatch => ({
    updateFilter(evt) {
      const { value } = evt.target;
      console.log(value);
    }
  })
)(Filters);
