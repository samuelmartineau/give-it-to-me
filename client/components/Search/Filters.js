// @flow
import React from 'react';
import { connect } from 'react-redux';
import {
  toggleCheckboxFilter,
  updateInputFilter,
  getWinesFiltered
} from '~/client/store/';
import config from '~/config';
const { WINE_TYPES_ALL, WINE_CATEGORIES_ALL } = config.wineTypes;

type Props = {
  count: number,
  updateCheckbox: Function,
  onInputChange: Function,
  filters: {
    wineTypes: Array<string>,
    wineCategories: Array<string>,
    maxYear: string,
    minYear: string,
    name: string
  }
};

export const Filters = (props: Props) => (
  <div>
    <h2>Filtres: {props.count} résultats</h2>
    <p>Couleur</p>
    {WINE_TYPES_ALL.map(type => {
      return (
        <label key={type.id}>
          <input
            type="checkbox"
            onChange={props.updateCheckbox}
            name="wineTypes"
            value={type.id}
            checked={props.filters.wineTypes.includes(type.id)}
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
            onChange={props.updateCheckbox}
            name="wineCategories"
            value={category.id}
            checked={props.filters.wineCategories.includes(category.id)}
          />
          {category.label}
        </label>
      );
    })}
    <p>Periode</p>
    <input
      onChange={props.onInputChange}
      type="number"
      name="minYear"
      value={props.filters.minYear}
      placeholder="Borne Inférieur"
    />
    <input
      onChange={props.onInputChange}
      type="number"
      name="maxYear"
      value={props.filters.maxYear}
      placeholder="Borne Supérieur"
    />
    <p>Nom</p>
    <input
      onChange={props.onInputChange}
      type="text"
      name="name"
      value={props.filters.name}
      placeholder="Nom"
    />
  </div>
);

export const FiltersConnected = connect(
  state => ({
    filters: state.search,
    count: getWinesFiltered(state).length
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
