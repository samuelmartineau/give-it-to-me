import React from 'react';
import styled from 'styled-components';

import { useNavigate } from '@tanstack/react-router';
import { useSelector, useDispatch } from 'react-redux';
import queryString from 'query-string';
import { toggleCheckboxFilter, RootState } from '@/store/';
import { Button } from '@/components/Toolkit';
import { WineFamilyType } from '@/Cellar.type';

const Wrapper = styled.div`
  margin: 1rem;
`;

const WineFamiliesFilterChips: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const wineFamilies = useSelector(({ search, wineFamilies }: RootState) => 
    search.wineFamilies.map((id) => wineFamilies.map[id])
  );

  const unselectWineFamily = (wineFamily: WineFamilyType) => () => {
    const { id } = wineFamily;
    const value = id.toString();

    const parsed = queryString.parse(location.search);

    let newFilters = [];
    const isCategoryAlreadySet = !!parsed.wineFamilies;

    if (isCategoryAlreadySet) {
      let previousFilters = [].concat(parsed.wineFamilies);
      const alreadySelected = previousFilters.includes(value);
      if (alreadySelected) {
        newFilters = previousFilters.filter((key) => key !== value);
      } else {
        // New value selected
        newFilters = [...previousFilters, value];
      }
      parsed.wineFamilies = newFilters;
    } else {
      // First value selected in this category
      parsed.wineFamilies = [value];
    }

    if (parsed.wineFamilies.length === 0) {
      delete parsed.wineFamilies;
    }

    const url = `/search?${queryString.stringify(parsed)}`;
    navigate({ to: url, replace: true });

    dispatch(toggleCheckboxFilter({ name: 'wineFamilies', value: id }));
  };

  return (
    <Wrapper>
      {wineFamilies.map((wineFamily) => (
        <Button
          key={wineFamily.id}
          onClick={unselectWineFamily(wineFamily)}
          type="button"
        >
          {wineFamily.name}
        </Button>
      ))}
    </Wrapper>
  );
};

export default WineFamiliesFilterChips;
