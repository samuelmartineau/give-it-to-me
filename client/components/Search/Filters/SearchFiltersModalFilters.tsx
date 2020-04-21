import React from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import queryString from 'query-string';
import {
  toggleCheckboxFilter,
  updateInputFilter,
  toggleFavoritesFilter,
  toggleOutsideBoxesFilter,
  RootState,
} from '~/client/store/';
import config from '~/config';
const { WINE_TYPES, WINE_CATEGORIES } = config.wineTypes;

import {
  Checkbox,
  TextField,
  CheckboxProps,
} from '~/client/components/Toolkit';
import WineFamiliesFilter from './WineFamiliesFilter';
import WineFamiliesFilterChips from './WineFamiliesFilterChips';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { WINE_CATEGORIES_ALL, WINE_TYPES_ALL } from '~/client/helpers';

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
const CheckboxStyled = styled(Checkbox)<CheckboxProps>`
  margin: auto 0.5em;
`;

type Props = PropsFromRedux;

class SearchFiltersModalFilters extends React.Component<Props> {
  onRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { onInputChange } = this.props;
    const data = event.currentTarget as
      | { value: string; name: 'minYear' }
      | { value: string; name: 'maxYear' };
    if (data.value.length > 4) {
      return;
    }
    if (data.value.length === 4) {
      const parsed = queryString.parse(location.search);
      const url = `/search?${queryString.stringify(parsed)}`;
      Router.push(url, url, { shallow: true });
    } else {
      const parsed = queryString.parse(location.search);
      delete parsed[data.name];
      const url = `/search?${queryString.stringify(parsed)}`;
      Router.push(url, url, { shallow: true });
    }

    onInputChange({ name: data.name, value: parseInt(data.value, 10) });
  };

  updateCheckbox = (evt: React.FormEvent<HTMLInputElement>) => {
    const { updateCheckbox } = this.props;
    const data = evt.currentTarget as
      | {
          name: 'wineTypes';
          value: keyof typeof WINE_TYPES;
        }
      | { name: 'wineCategories'; value: keyof typeof WINE_CATEGORIES };

    const parsed = queryString.parse(location.search);
    const keyName = data.name;
    let previousFilter = parsed[keyName];

    if (previousFilter) {
      previousFilter = [].concat(previousFilter);
      if (previousFilter.includes(data.value)) {
        previousFilter = previousFilter.filter((key) => key !== data.value);
        if (previousFilter.length === 0) {
          delete parsed[keyName];
        }
      } else {
        previousFilter.push(data.value);
      }
    } else {
      parsed[keyName] = [data.value];
    }
    const url = `/search?${queryString.stringify(parsed)}`;
    Router.push(url, url, { shallow: true });

    updateCheckbox(data);
  };

  toggleFavoritesFilter = (evt: React.FormEvent<HTMLInputElement>) => {
    const { toggleFavoritesFilter } = this.props;
    const { checked } = evt.currentTarget;

    const parsed = queryString.parse(location.search);
    if (checked) {
      parsed.favorites = 'true';
    } else {
      delete parsed.favorites;
    }
    const url = `/search?${queryString.stringify(parsed)}`;
    Router.push(url, url, { shallow: true });

    toggleFavoritesFilter();
  };

  toggleOutsideBoxesFilter = (evt: React.FormEvent<HTMLInputElement>) => {
    const { toggleOutsideBoxesFilter } = this.props;
    const { checked } = evt.currentTarget;

    const parsed = queryString.parse(location.search);
    if (checked) {
      parsed.outsideBoxes = 'true';
    } else {
      delete parsed.outsideBoxes;
    }
    const url = `/search?${queryString.stringify(parsed)}`;
    Router.push(url, url, { shallow: true });

    toggleOutsideBoxesFilter();
  };

  onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { onInputChange } = this.props;
    const data = event.currentTarget as { name: 'name'; value: string };
    onInputChange(data);
  };

  render() {
    const { filters, onInputChange } = this.props;
    return (
      <>
        <Label>
          <Text>Couleur</Text>
          {WINE_TYPES_ALL.map((type) => (
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
          {WINE_CATEGORIES_ALL.map((category) => {
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
        <WineFamiliesFilter />
        <WineFamiliesFilterChips />
        <Label>
          <Text>Nom du vin</Text>
          <TextField
            onChange={this.onNameChange}
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
        <Label>
          <Text>Restreindre aux bouteilles hors casier</Text>
          <CheckboxStyled
            onChange={this.toggleOutsideBoxesFilter}
            name="inBoxes"
            value="inBoxes"
            id="search-filters-in-boxes"
            checked={filters.outsideBoxes}
          >
            Seulement hors casier
          </CheckboxStyled>
        </Label>
      </>
    );
  }
}

const connector = connect(
  (state: RootState) => ({
    filters: state.search,
  }),
  (dispatch: ThunkDispatch<{}, {}, AnyAction>) => ({
    updateCheckbox(
      data:
        | {
            name: 'wineTypes';
            value: keyof typeof WINE_TYPES;
          }
        | { name: 'wineCategories'; value: keyof typeof WINE_CATEGORIES }
    ) {
      dispatch(toggleCheckboxFilter(data));
    },
    toggleFavoritesFilter() {
      dispatch(toggleFavoritesFilter());
    },
    toggleOutsideBoxesFilter() {
      dispatch(toggleOutsideBoxesFilter());
    },
    onInputChange(
      data:
        | {
            value: number;
            name: 'minYear';
          }
        | { value: number; name: 'maxYear' }
        | { name: 'name'; value: string }
    ) {
      dispatch(updateInputFilter(data));
    },
  })
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(SearchFiltersModalFilters);
