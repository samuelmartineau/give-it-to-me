// @flow
import React from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { connect } from 'react-redux';
import queryString from 'query-string';
import {
  toggleCheckboxFilter,
  updateInputFilter,
  toggleFavoritesFilter
} from '~/client/store/';
import config from '~/config';
import { Checkbox, TextField } from '~/client/components/Toolkit';
import WineFamilyMultipleSelector from '~/client/components/Autocomplete/WineFamilyMultipleSelector';

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
  updateWineFamilies: Function,
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

class SearchFiltersModalFilters extends React.Component<Props> {
  onRangeChange = evt => {
    const { onInputChange } = this.props;
    const { value, name } = evt.target;
    if (value.length > 4) {
      return;
    }
    if (value.length === 4) {
      const parsed = queryString.parse(location.search);
      Router.push({
        pathname: '/search',
        query: { ...parsed, [name]: value }
      });
    } else {
      const parsed = queryString.parse(location.search);
      delete parsed[name];
      Router.push({
        pathname: '/search',
        query: { ...parsed }
      });
    }

    onInputChange(evt);
  };
  updateCheckbox = evt => {
    const { updateCheckbox } = this.props;
    const { name, value } = evt.target;

    const parsed = queryString.parse(location.search);
    if (parsed[name]) {
      parsed[name] = [].concat(parsed[name]);
      if (parsed[name].includes(value)) {
        parsed[name] = parsed[name].filter(key => key !== value);
        if (parsed[name].length === 0) {
          delete parsed[name];
        }
      } else {
        parsed[name].push(value);
      }
    } else {
      parsed[name] = [value];
    }
    Router.push({
      pathname: '/search',
      query: { ...parsed }
    });

    updateCheckbox(evt);
  };

  toggleFavoritesFilter = evt => {
    const { toggleFavoritesFilter } = this.props;
    const { checked } = evt.target;

    const parsed = queryString.parse(location.search);
    if (checked) {
      parsed.favorite = true;
    } else {
      delete parsed.favorite;
    }
    Router.push({
      pathname: '/search',
      query: { ...parsed }
    });

    toggleFavoritesFilter(evt);
  };

  selectWineFamily = (evt, item) => {
    const {
      suggestion: {
        original: { id }
      }
    } = item;
    const { updateWineFamilies } = this.props;
    const name = 'wineFamilies';
    const value = id;

    const parsed = queryString.parse(location.search);
    if (parsed[name]) {
      parsed[name] = [].concat(parsed[name]);
      if (parsed[name].includes(value)) {
        parsed[name] = parsed[name].filter(key => key !== value);
        if (parsed[name].length === 0) {
          delete parsed[name];
        }
      } else {
        parsed[name].push(value);
      }
    } else {
      parsed[name] = [value];
    }
    Router.push({
      pathname: '/search',
      query: { ...parsed }
    });

    updateWineFamilies(evt);
  };

  render() {
    const { filters, onInputChange } = this.props;
    return (
      <>
        <Label>
          <Text>Couleur</Text>
          {WINE_TYPES_ALL.map(type => (
            <CheckboxStyled
              key={type.id}
              onChange={this.updateCheckbox}
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
                onChange={this.updateCheckbox}
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
              onChange={this.onRangeChange}
              type="number"
              name="minYear"
              value={filters.minYear}
              placeholder="Borne inf (ex: 1970)"
            />
            <TextField
              onChange={this.onRangeChange}
              type="number"
              name="maxYear"
              value={filters.maxYear}
              placeholder="Borne sup (ex: 2019)"
            />
          </Periode>
        </Label>
        <Label>
          <Text>Appelation</Text>
          <WineFamilyMultipleSelector
            selectedFamilyIds={[]}
            onSuggestionSelected={this.selectWineFamily}
          />
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
            onChange={this.toggleFavoritesFilter}
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
    updateWineFamilies(value) {
      dispatch(toggleCheckboxFilter('wineFamilies', value));
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
