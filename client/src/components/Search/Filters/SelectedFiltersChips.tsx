import React from 'react';
import styled from 'styled-components';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useSelector, useDispatch } from 'react-redux';
import {
  toggleCheckboxFilter,
  updateInputFilter,
  toggleFavoritesFilter,
  toggleOutsideBoxesFilter,
  RootState,
} from '@/store/';
import { Button } from '@/components/Toolkit';
import { WINE_TYPES_ALL, WINE_CATEGORIES_ALL } from '@/helpers';
import { SearchParams } from '@/routes/search';
import { WineFamilyType } from '@/Cellar.type';

const ChipsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const Chip = styled(Button)`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 16px;
  font-size: 0.875rem;
  gap: 0.5rem;

  &::after {
    content: '×';
    font-size: 1.25rem;
    font-weight: bold;
    margin-left: 0.25rem;
  }
`;

const SelectedFiltersChips: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate({ from: '/search' });
  const searchParams = useSearch({ from: '/search' });
  const filters = useSelector((state: RootState) => state.search);
  
  const wineFamilies = useSelector(({ search, wineFamilies }: RootState) =>
    search.wineFamilies.map((id) => wineFamilies.map[id])
  );

  const removeWineType = (typeId: string) => () => {
    dispatch(
      toggleCheckboxFilter({ name: 'wineTypes', value: typeId as any })
    );
    
    const currentTypes = searchParams.wineTypes || [];
    const typesArray = Array.isArray(currentTypes)
      ? currentTypes
      : [currentTypes];
    const newTypes = typesArray.filter((t) => t !== typeId);

    navigate({
      search: (prev: SearchParams) => ({
        ...prev,
        wineTypes: newTypes.length > 0 ? newTypes : undefined,
      }),
      replace: true,
    });
  };

  const removeWineCategory = (categoryId: string) => () => {
    dispatch(
      toggleCheckboxFilter({ name: 'wineCategories', value: categoryId as any })
    );
    
    const currentCategories = searchParams.wineCategories || [];
    const categoriesArray = Array.isArray(currentCategories)
      ? currentCategories
      : [currentCategories];
    const newCategories = categoriesArray.filter((c) => c !== categoryId);

    navigate({
      search: (prev: SearchParams) => ({
        ...prev,
        wineCategories: newCategories.length > 0 ? newCategories : undefined,
      }),
      replace: true,
    });
  };

  const removeWineFamily = (wineFamily: WineFamilyType) => () => {
    const { id } = wineFamily;
    dispatch(toggleCheckboxFilter({ name: 'wineFamilies', value: id }));

    const currentFamilies = searchParams.wineFamilies || [];
    const familiesArray = Array.isArray(currentFamilies)
      ? currentFamilies
      : [currentFamilies];
    const newFamilies = familiesArray.filter((f) => f !== id.toString());

    navigate({
      search: (prev: SearchParams) => ({
        ...prev,
        wineFamilies: newFamilies.length > 0 ? newFamilies : undefined,
      }),
      replace: true,
    });
  };

  const removeMinYear = () => {
    dispatch(updateInputFilter({ name: 'minYear', value: undefined }));
    navigate({
      search: (prev: SearchParams) => ({
        ...prev,
        minYear: undefined,
      }),
      replace: true,
    });
  };

  const removeMaxYear = () => {
    dispatch(updateInputFilter({ name: 'maxYear', value: undefined }));
    navigate({
      search: (prev: SearchParams) => ({
        ...prev,
        maxYear: undefined,
      }),
      replace: true,
    });
  };

  const removeName = () => {
    dispatch(updateInputFilter({ name: 'name', value: '' }));
    navigate({
      search: (prev: SearchParams) => ({
        ...prev,
        name: undefined,
      }),
      replace: true,
    });
  };

  const removeFavorites = () => {
    dispatch(toggleFavoritesFilter());
    navigate({
      search: (prev: SearchParams) => ({
        ...prev,
        favorites: undefined,
      }),
      replace: true,
    });
  };

  const removeOutsideBoxes = () => {
    dispatch(toggleOutsideBoxesFilter());
    navigate({
      search: (prev: SearchParams) => ({
        ...prev,
        outsideBoxes: undefined,
      }),
      replace: true,
    });
  };

  const hasFilters =
    filters.wineTypes.length > 0 ||
    filters.wineCategories.length > 0 ||
    filters.wineFamilies.length > 0 ||
    filters.minYear !== undefined ||
    filters.maxYear !== undefined ||
    (filters.name && filters.name.length > 0) ||
    filters.favorites ||
    filters.outsideBoxes;

  if (!hasFilters) {
    return null;
  }

  return (
    <ChipsContainer>
      {filters.wineTypes.map((typeId) => {
        const type = WINE_TYPES_ALL.find((t) => t.id === typeId);
        return (
          <Chip key={typeId} onClick={removeWineType(typeId)} type="button">
            {type?.label || typeId}
          </Chip>
        );
      })}

      {filters.wineCategories.map((categoryId) => {
        const category = WINE_CATEGORIES_ALL.find((c) => c.id === categoryId);
        return (
          <Chip
            key={categoryId}
            onClick={removeWineCategory(categoryId)}
            type="button"
          >
            {category?.label || categoryId}
          </Chip>
        );
      })}

      {wineFamilies.map((wineFamily) => (
        <Chip
          key={wineFamily.id}
          onClick={removeWineFamily(wineFamily)}
          type="button"
        >
          {wineFamily.name}
        </Chip>
      ))}

      {filters.minYear !== undefined && (
        <Chip onClick={removeMinYear} type="button">
          Année min: {filters.minYear}
        </Chip>
      )}

      {filters.maxYear !== undefined && (
        <Chip onClick={removeMaxYear} type="button">
          Année max: {filters.maxYear}
        </Chip>
      )}

      {filters.name && filters.name.length > 0 && (
        <Chip onClick={removeName} type="button">
          Nom: {filters.name}
        </Chip>
      )}

      {filters.favorites && (
        <Chip onClick={removeFavorites} type="button">
          Favoris
        </Chip>
      )}

      {filters.outsideBoxes && (
        <Chip onClick={removeOutsideBoxes} type="button">
          Hors casier
        </Chip>
      )}
    </ChipsContainer>
  );
};

export default SelectedFiltersChips;
