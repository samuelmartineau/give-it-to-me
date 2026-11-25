import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useSearch } from '@tanstack/react-router';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/SearchRounded';
import WinesList from './WinesList';
import {
  syncUrlParams,
  getWinesFiltered,
  updateInputFilter,
  RootState,
} from '@/store';
import { TextField } from '@/components/Toolkit';
import SearchFiltersButton from './Filters/SearchFiltersButton';
import SelectedFiltersChips from './Filters/SelectedFiltersChips';
import EmptyResults from './EmptyResults';
import { SearchParams } from '@/routes/search';

const Bar = styled.div`
  display: flex;
  gap: 12px;
  align-items: stretch;
`;

const SearchBox = styled.label`
  position: relative;
  flex: 1;

  & > svg {
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.8rem;
    color: ${({ theme }) => theme.colors.textMuted};
    pointer-events: none;
  }
`;

const SearchInput = styled(TextField)`
  min-height: 60px;
  padding-left: 56px;
  font-size: 1.2rem;
`;

const Count = styled.h2`
  margin: 24px 0 8px;
  font-size: 1.4rem;
`;

export const Search: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate({ from: '/search' });
  const count = useSelector(
    (state: RootState) => getWinesFiltered(state).length,
  );
  const name = useSelector((state: RootState) => state.search.name);
  const searchParams = useSearch({ from: '/search' });

  useEffect(() => {
    // Sync URL params with Redux store when search params change
    //@ts-ignore
    dispatch(syncUrlParams(searchParams));
  }, [searchParams, dispatch]);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    dispatch(updateInputFilter({ name: 'name', value }));
    navigate({
      search: (prev: SearchParams) => ({ ...prev, name: value || undefined }),
      replace: true,
    });
  };

  return (
    <div>
      <Bar>
        <SearchBox>
          <SearchIcon />
          <SearchInput
            type="search"
            value={name ?? ''}
            onChange={onNameChange}
            placeholder="Nom du vin"
            aria-label="Rechercher un vin par son nom"
          />
        </SearchBox>
        <SearchFiltersButton />
      </Bar>
      <SelectedFiltersChips />
      <Count>
        {count} vin{count > 1 && 's'} trouvé{count > 1 && 's'}
      </Count>
      <WinesList />
      <EmptyResults />
    </div>
  );
};

export default Search;
