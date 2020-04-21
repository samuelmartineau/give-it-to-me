import React from 'react';
import styled from 'styled-components';

import Router from 'next/router';
import { connect, ConnectedProps } from 'react-redux';
import queryString from 'query-string';
import { toggleCheckboxFilter, RootState } from '~/client/store/';
import { Button } from '~/client/components/Toolkit';
import { WineFamilyType } from '~/client/Cellar.type';

const Wrapper = styled.div`
  margin: 1rem;
`;

type Props = PropsFromRedux;

class WineFamiliesFilterChips extends React.Component<Props> {
  unselectWineFamily = (wineFamily: WineFamilyType) => () => {
    const { id } = wineFamily;
    const { removeWineFamilies } = this.props;
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
    Router.push(url, url, { shallow: true });

    removeWineFamilies(id);
  };

  render() {
    const { wineFamilies } = this.props;
    return (
      <Wrapper>
        {wineFamilies.map((wineFamily) => (
          <Button
            key={wineFamily.id}
            onClick={this.unselectWineFamily(wineFamily)}
            type="button"
          >
            {wineFamily.name}
          </Button>
        ))}
      </Wrapper>
    );
  }
}

const connector = connect(
  ({ search, wineFamilies }: RootState) => ({
    wineFamilies: search.wineFamilies.map((id) => wineFamilies.map[id]),
  }),
  (dispatch) => ({
    removeWineFamilies(id: number) {
      dispatch(toggleCheckboxFilter({ name: 'wineFamilies', value: id }));
    },
  })
);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(WineFamiliesFilterChips);
