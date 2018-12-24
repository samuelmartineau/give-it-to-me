// @flow
import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
  toggleCheckboxFilter,
  updateInputFilter,
  toggleFavoritesFilter
} from '~/client/store/';
import config from '~/config';
import { Checkbox, TextField } from '~/client/components/Toolkit';

const { WINE_TYPES_ALL, WINE_CATEGORIES_ALL } = config.wineTypes;

const Label = styled.label`
  margin: 1rem;
  display: block;
`;

const Text = styled.div`
  font-style: italic;
`;

const Periode = styled.div`
  display: flex;
`;
const CheckboxStyled = styled(Checkbox)`
  margin: auto 0.5em;
`;

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

class SearchFiltersModalFilters extends React.PureComponent<Props> {
  render() {
    const {
      updateCheckbox,
      filters,
      onInputChange,
      toggleFavoritesFilter
    } = this.props;
    return (
      <>
        <Label>
          <Text>Couleur</Text>
          {WINE_TYPES_ALL.map(type => (
            <CheckboxStyled
              key={type.id}
              onChange={updateCheckbox}
              name="wineTypes"
              id={`search-filters${type.id}`}
              value={type.id}
              checked={filters.wineTypes.includes(type.id)}
            >
              {type.label}
            </CheckboxStyled>
          ))}
        </Label>
        <Label>
          <Text>Texture</Text>
          {WINE_CATEGORIES_ALL.map(category => {
            return (
              <CheckboxStyled
                key={category.id}
                onChange={updateCheckbox}
                name="wineCategories"
                id={`search-filters${category.id}`}
                value={category.id}
                checked={filters.wineCategories.includes(category.id)}
              >
                {category.label}
              </CheckboxStyled>
            );
          })}
        </Label>
        <Label>
          <Text>Periode</Text>
          <Periode>
            <TextField
              onChange={onInputChange}
              type="number"
              name="minYear"
              value={filters.minYear}
              placeholder="Borne inf (ex: 1970)"
            />
            <TextField
              onChange={onInputChange}
              type="number"
              name="maxYear"
              value={filters.maxYear}
              placeholder="Borne sup (ex: 2019)"
            />
          </Periode>
        </Label>

        <Label>
          <Text>Nom du vin</Text>
          <TextField
            onChange={onInputChange}
            type="text"
            name="name"
            value={filters.name}
            placeholder="Nom"
          />
        </Label>
        <Label>
          <Text>Restreindre aux favoris</Text>
          <CheckboxStyled
            onChange={toggleFavoritesFilter}
            name="favorites"
            value="favorites"
            id="search-filters"
            checked={filters.favorites}
          >
            Favoris
          </CheckboxStyled>
        </Label>
      </>
    );
  }
}

export default connect(
  state => ({
    filters: state.search
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
)(SearchFiltersModalFilters);
