// @flow
import React from 'react';
import { connect } from 'react-redux';
import {
  getWinesFiltered,
  toggleCheckboxFilter,
  updateInputFilter
} from '~/client/store/';
import { WineCardConnected } from '../Wine/WineCardConnected';
import config from '~/config';
const { WINE_TYPES_ALL, WINE_CATEGORIES_ALL } = config.wineTypes;

type Props = {};

export class Filters extends React.Component {
  render() {
    console.log(this.props.filters);
    return (
      <div>
        <p>Couleur</p>
        {WINE_TYPES_ALL.map(type => {
          return (
            <label key={type.id}>
              <input
                type="checkbox"
                onClick={this.props.updateCheckbox}
                name="wineTypes"
                value={type.id}
                checked={this.props.filters.wineTypes.includes(type.id)}
              />
              {type.label}
            </label>
          );
        })}
        <p>Texture</p>
        {WINE_CATEGORIES_ALL.map(category => {
          return (
            <label key={category.id}>
              <input
                type="checkbox"
                onClick={this.props.updateCheckbox}
                name="wineCategories"
                value={category.id}
                checked={this.props.filters.wineCategories.includes(
                  category.id
                )}
              />
              {category.label}
            </label>
          );
        })}
        <p>Periode</p>
        <input
          onChange={this.props.onInputChange}
          type="number"
          name="minYear"
          placeholder="Borne Inférieur"
        />
        <input
          onChange={this.props.onInputChange}
          type="number"
          name="maxYear"
          placeholder="Borne Supérieur"
        />
      </div>
    );
  }
}

export const FiltersConnected = connect(
  state => ({
    filters: state.search
  }),
  dispatch => ({
    updateCheckbox(evt) {
      const { value, name } = evt.target;
      dispatch(toggleCheckboxFilter(name, value));
    },
    onInputChange(evt) {
      const { value, name } = evt.target;
      dispatch(updateInputFilter(name, value));
    }
  })
)(Filters);
