import React from 'react';
import styled from 'styled-components';

import { useNavigate, useSearch } from '@tanstack/react-router';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCheckboxFilter, RootState } from '@/store/';
import CloseIcon from '@mui/icons-material/CloseRounded';
import { Button } from '@/components/Toolkit';
import { WineFamilyType } from '@/Cellar.type';
import { SearchParams } from '@/routes/search';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;

  &:empty {
    display: none;
  }
`;

const WineFamiliesFilterChips: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate({ from: '/search' });
  const searchParams = useSearch({ from: '/search' });
  const wineFamilies = useSelector(({ search, wineFamilies }: RootState) =>
    search.wineFamilies.map((id) => wineFamilies.map[id]),
  );

  const unselectWineFamily = (wineFamily: WineFamilyType) => () => {
    const { id } = wineFamily;
    const value = id.toString();

    const currentFamilies = searchParams.wineFamilies || [];
    const familiesArray = Array.isArray(currentFamilies)
      ? currentFamilies
      : [currentFamilies];

    let newFilters: string[] = [];
    const alreadySelected = familiesArray.includes(value);

    if (alreadySelected) {
      newFilters = familiesArray.filter((key) => key !== value);
    } else {
      newFilters = [...familiesArray, value];
    }

    navigate({
      search: (prev: SearchParams) => ({
        ...prev,
        wineFamilies: newFilters.length > 0 ? newFilters : undefined,
      }),
      replace: true,
    });

    dispatch(toggleCheckboxFilter({ name: 'wineFamilies', value: id }));
  };

  return (
    <Wrapper>
      {wineFamilies.map((wineFamily) => (
        <Button
          key={wineFamily.id}
          onClick={unselectWineFamily(wineFamily)}
          type="button"
          variant="ghost"
          aria-label={`Retirer ${wineFamily.name}`}
        >
          {wineFamily.name}
          <CloseIcon />
        </Button>
      ))}
    </Wrapper>
  );
};

export default WineFamiliesFilterChips;
