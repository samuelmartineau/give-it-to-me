import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import queryString from 'query-string';
import {
  toggleCheckboxFilter,
  updateInputFilter,
  toggleFavoritesFilter,
  toggleOutsideBoxesFilter,
  RootState,
} from '@/store/';
import config from '~/config';
const { WINE_TYPES, WINE_CATEGORIES } = config.wineTypes;

import { Checkbox, TextField, CheckboxProps } from '@/components/Toolkit';
import WineFamiliesFilter from './WineFamiliesFilter';
import WineFamiliesFilterChips from './WineFamiliesFilterChips';
import { WINE_CATEGORIES_ALL, WINE_TYPES_ALL } from '@/helpers';

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

const SearchFiltersModalFilters: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.search);

  const onRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const data = event.currentTarget as
      | { value: string; name: 'minYear' }
      | { value: string; name: 'maxYear' };
    if (data.value.length > 4) {
      return;
    }
    if (data.value.length === 4) {
      const parsed = queryString.parse(location.search);
      const url = `/search?${queryString.stringify(parsed)}`;
      navigate({ to: url, replace: true });
    } else {
      const parsed = queryString.parse(location.search);
      delete parsed[data.name];
      const url = `/search?${queryString.stringify(parsed)}`;
      navigate({ to: url, replace: true });
    }

    dispatch(updateInputFilter({ name: data.name, value: parseInt(data.value, 10) }));
  };

  const updateCheckbox = (evt: React.FormEvent<HTMLInputElement>) => {
    const data = evt.currentTarget as
      | {
          name: 'wineTypes';
          value: keyof typeof WINE_TYPES;
        }
      | { name: 'wineCategories'; value: keyof typeof WINE_CATEGORIES };

    const parsed = queryString.parse(location.search);
    const keyName = data.name;

    let newFilters = [];
    const isCategoryAlreadySet = !!parsed[keyName];

    if (isCategoryAlreadySet) {
      let previousFilters = [].concat(parsed[keyName]);
      const alreadySelected = previousFilters.includes(data.value);
      if (alreadySelected) {
        newFilters = previousFilters.filter((key) => key !== data.value);
      } else {
        // New value selected
        newFilters = [...previousFilters, data.value];
      }
      parsed[keyName] = newFilters;
    } else {
      // First value selected in this category
      parsed[keyName] = [data.value];
    }

    if (parsed[keyName].length === 0) {
      delete parsed[keyName];
    }

    const url = `/search?${queryString.stringify(parsed)}`;
    navigate({ to: url, replace: true });

    dispatch(toggleCheckboxFilter(data));
  };

  const handleToggleFavoritesFilter = (evt: React.FormEvent<HTMLInputElement>) => {
    const { checked } = evt.currentTarget;

    const parsed = queryString.parse(location.search);
    if (checked) {
      parsed.favorites = 'true';
    } else {
      delete parsed.favorites;
    }
    const url = `/search?${queryString.stringify(parsed)}`;
    navigate({ to: url, replace: true });

    dispatch(toggleFavoritesFilter());
  };

  const handleToggleOutsideBoxesFilter = (evt: React.FormEvent<HTMLInputElement>) => {
    const { checked } = evt.currentTarget;

    const parsed = queryString.parse(location.search);
    if (checked) {
      parsed.outsideBoxes = 'true';
    } else {
      delete parsed.outsideBoxes;
    }
    const url = `/search?${queryString.stringify(parsed)}`;
    navigate({ to: url, replace: true });

    dispatch(toggleOutsideBoxesFilter());
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const data = event.currentTarget as { name: 'name'; value: string };
    dispatch(updateInputFilter(data));
  };

  return (
    <>
      <Label>
        <Text>Couleur</Text>
        {WINE_TYPES_ALL.map((type) => (
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
        {WINE_CATEGORIES_ALL.map((category) => {
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
            onChange={onRangeChange}
            type="number"
            name="minYear"
            value={filters.minYear}
            placeholder="Borne inf (ex: 1970)"
          />
          <TextField
            onChange={onRangeChange}
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
          onChange={onNameChange}
          type="text"
          name="name"
          value={filters.name}
          placeholder="Nom"
        />
      </Label>
      <Label>
        <Text>Restreindre aux favoris</Text>
        <CheckboxStyled
          onChange={handleToggleFavoritesFilter}
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
          onChange={handleToggleOutsideBoxesFilter}
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
};

export default SearchFiltersModalFilters;
