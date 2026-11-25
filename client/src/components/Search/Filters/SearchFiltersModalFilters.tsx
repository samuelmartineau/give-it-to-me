import React from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import {
  toggleCheckboxFilter,
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

const Group = styled.fieldset`
  margin: 0;
  padding: 20px 0;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:first-child {
    padding-top: 0;
  }
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
`;

const Legend = styled.legend`
  float: left;
  width: 100%;
  margin: 0 0 12px;
  padding: 0;
  font-size: 1.15rem;
  font-weight: 700;

  & + * {
    clear: both;
  }
`;

const Options = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const Years = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

const YearLabel = styled.label`
  display: block;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textMuted};

  & > input {
    margin-top: 4px;
  }
`;

const CheckboxStyled = styled(Checkbox)<CheckboxProps>``;

const capitalize = (label: string) =>
  label.charAt(0).toUpperCase() + label.slice(1);

const SearchFiltersModalFilters: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate({ from: '/search' });
  const searchParams = useSearch({ from: '/search' });
  const filters = useSelector((state: RootState) => state.search);

  const onRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const data = event.target as
      { value: string; name: 'minYear' } | { value: string; name: 'maxYear' };
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

    let newFilters: string[];

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

  // Only offer the types that exist for the chosen colours (keep any type
  // already ticked so it can still be unticked).
  const visibleCategories = filters.wineTypes.length
    ? WINE_CATEGORIES_ALL.filter(
        (category) =>
          filters.wineCategories.includes(category.id) ||
          filters.wineTypes.some((type) =>
            (WINE_TYPES[type].categories as readonly string[]).includes(
              category.id,
            ),
          ),
      )
    : WINE_CATEGORIES_ALL;

  return (
    <>
      <Group>
        <Legend>Couleur</Legend>
        <Options>
          {WINE_TYPES_ALL.map((type) => (
            <CheckboxStyled
              key={type.id}
              onChange={updateCheckbox}
              name="wineTypes"
              id={`search-filters${type.id}`}
              value={type.id}
              checked={filters.wineTypes.includes(type.id)}
            >
              {capitalize(type.label)}
            </CheckboxStyled>
          ))}
        </Options>
      </Group>
      <Group>
        <Legend>Type</Legend>
        <Options>
          {visibleCategories.map((category) => (
            <CheckboxStyled
              key={category.id}
              onChange={updateCheckbox}
              name="wineCategories"
              id={`search-filters${category.id}`}
              value={category.id}
              checked={filters.wineCategories.includes(category.id)}
            >
              {capitalize(category.label)}
            </CheckboxStyled>
          ))}
        </Options>
      </Group>
      <Group>
        <Legend>Afficher seulement</Legend>
        <Options>
          <CheckboxStyled
            onChange={handleToggleFavoritesFilter}
            name="favorites"
            value="favorites"
            id="search-filters"
            checked={filters.favorites}
          >
            Mes favoris
          </CheckboxStyled>
          <CheckboxStyled
            onChange={handleToggleOutsideBoxesFilter}
            name="inBoxes"
            value="inBoxes"
            id="search-filters-in-boxes"
            checked={filters.outsideBoxes}
          >
            Hors casier
          </CheckboxStyled>
        </Options>
      </Group>
      <Group>
        <Legend>Années</Legend>
        <Years>
          <YearLabel>
            De
            <TextField
              onChange={onRangeChange}
              type="number"
              inputMode="numeric"
              name="minYear"
              value={filters.minYear !== undefined ? filters.minYear : ''}
              placeholder="1970"
            />
          </YearLabel>
          <YearLabel>
            À
            <TextField
              onChange={onRangeChange}
              type="number"
              inputMode="numeric"
              name="maxYear"
              value={filters.maxYear !== undefined ? filters.maxYear : ''}
              placeholder="2024"
            />
          </YearLabel>
        </Years>
      </Group>
      <Group>
        <Legend>Appellation</Legend>
        <WineFamiliesFilter />
        <WineFamiliesFilterChips />
      </Group>
    </>
  );
};

export default SearchFiltersModalFilters;
