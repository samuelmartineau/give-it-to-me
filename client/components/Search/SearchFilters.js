// @flow
import React from 'react';
import { connect } from 'react-redux';
import {
  toggleCheckboxFilter,
  updateInputFilter,
  getWinesFiltered,
  toggleFavoritesFilter
} from '~/client/store/';
import config from '~/config';
import { Checkbox, TextField } from '~/client/components/Toolkit';
const { WINE_TYPES_ALL, WINE_CATEGORIES_ALL } = config.wineTypes;

type Props = {
  count: number,
  updateCheckbox: Function,
  onInputChange: Function,
  toggleFavoritesFilter: Function,
  filters: {
    wineTypes: Array<string>,
    wineCategories: Array<string>,
    maxYear: string,
    minYear: string,
    name: string,
    favorites: boolean
  }
};
export const SearchFilters = (props: Props) => (
  <div>
    <h2>Filtres: {props.count} résultats</h2>
    <p>Couleur</p>
    {WINE_TYPES_ALL.map(type => (
      <Checkbox
        key={type.id}
        onChange={props.updateCheckbox}
        name="wineTypes"
        id={`search-filters${type.id}`}
        value={type.id}
        checked={props.filters.wineTypes.includes(type.id)}
      >
        {type.label}
      </Checkbox>
    ))}
    <p>Texture</p>
    {WINE_CATEGORIES_ALL.map(category => {
      return (
        <Checkbox
          key={category.id}
          onChange={props.updateCheckbox}
          name="wineCategories"
          id={`search-filters${category.id}`}
          value={category.id}
          checked={props.filters.wineCategories.includes(category.id)}
        >
          {category.label}
        </Checkbox>
      );
    })}
    <p>Periode</p>
    <TextField
      onChange={props.onInputChange}
      type="number"
      name="minYear"
      value={props.filters.minYear}
      placeholder="Borne Inférieur"
    />
    <TextField
      onChange={props.onInputChange}
      type="number"
      name="maxYear"
      value={props.filters.maxYear}
      placeholder="Borne Supérieur"
    />
    <p>Nom</p>
    <TextField
      onChange={props.onInputChange}
      type="text"
      name="name"
      value={props.filters.name}
      placeholder="Nom"
    />
    <Checkbox
      onChange={props.toggleFavoritesFilter}
      name="favorites"
      value="favorites"
      id="search-filters"
      checked={props.filters.favorites}
    >
      Favoris
    </Checkbox>
  </div>
);

export default connect(
  state => ({
    filters: state.search,
    count: getWinesFiltered(state).length
  }),
  dispatch => ({
    updateCheckbox(evt) {
      const { value, name } = evt.target;
      dispatch(toggleCheckboxFilter(name, value));
    },
    toggleFavoritesFilter() {
      dispatch(toggleFavoritesFilter());
    },
    onInputChange(evt) {
      const { value, name } = evt.target;
      dispatch(updateInputFilter(name, value));
    }
  })
)(SearchFilters);
