import React from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  toggleCheckboxFilter,
  updateInputFilter,
  toggleFavoritesFilter,
  toggleOutsideBoxesFilter,
  RootState,
} from '@/store/';
import config from '~/config';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { WINE_TYPES, WINE_CATEGORIES } = config.wineTypes;

import { Checkbox, TextField, CheckboxProps } from '@/components/Toolkit';
import WineFamiliesFilter from './WineFamiliesFilter';
import WineFamiliesFilterChips from './WineFamiliesFilterChips';
import { WINE_CATEGORIES_ALL, WINE_TYPES_ALL } from '@/helpers';
import { SearchParams } from '@/routes/search';

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
  const dispatch = useDispatch();
  const navigate = useNavigate({ from: '/search' });
  const searchParams = useSearch({ from: '/search' });
  const filters = useSelector((state: RootState) => state.search);

  const onRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const data = event.target as
      | { value: string; name: 'minYear' }
      | { value: string; name: 'maxYear' };
    if (data.value.length > 4) {
      return;
    }

    // dispatch(
    //   updateInputFilter({ name: data.name, value: parseInt(data.value, 10) }),
    // );
    navigate({
      search: (prev: SearchParams) => ({
        ...prev,
        [data.name]: data.value ? parseInt(data.value) : undefined,
      }),
      replace: true,
    });
  };

  const updateCheckbox = (evt: React.FormEvent<HTMLInputElement>) => {
    const data = evt.currentTarget as
      | {
          name: 'wineTypes';
          value: keyof typeof WINE_TYPES;
        }
      | { name: 'wineCategories'; value: keyof typeof WINE_CATEGORIES };

    const keyName = data.name;

    let newFilters: string[] = [];

    const urlValue = searchParams[keyName];
    let nextUrlValue: string[] = [];

    if (urlValue) {
      let previousFilters: string[] = [...urlValue];
      const alreadySelected = previousFilters.includes(data.value);
      if (alreadySelected) {
        newFilters = previousFilters.filter((key) => key !== data.value);
      } else {
        // New value selected
        newFilters = [...previousFilters, data.value];
      }
      nextUrlValue = newFilters;
    } else {
      // First value selected in this category
      nextUrlValue = [data.value];
    }

    dispatch(toggleCheckboxFilter(data));

    navigate({
      search: (prev: SearchParams) => ({
        ...prev,
        [data.name]: nextUrlValue.length ? nextUrlValue : undefined,
      }),
      replace: true,
    });
  };

  const handleToggleFavoritesFilter = (
    evt: React.FormEvent<HTMLInputElement>,
  ) => {
    const { checked } = evt.currentTarget;

    dispatch(toggleFavoritesFilter());

    navigate({
      search: (prev: SearchParams) => ({
        ...prev,
        favorites: checked ?? undefined,
      }),
      replace: true,
    });
  };

  const handleToggleOutsideBoxesFilter = (
    evt: React.FormEvent<HTMLInputElement>,
  ) => {
    const { checked } = evt.currentTarget;

    dispatch(toggleOutsideBoxesFilter());
    navigate({
      search: (prev: SearchParams) => ({
        ...prev,
        outsideBoxes: checked ?? undefined,
      }),
      replace: true,
    });
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
            value={filters.minYear !== undefined ? filters.minYear : ''}
            placeholder="Borne inf (ex: 1970)"
          />
          <TextField
            onChange={onRangeChange}
            type="number"
            name="maxYear"
            value={filters.maxYear !== undefined ? filters.maxYear : ''}
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
