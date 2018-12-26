// @flow
import React from 'react';
import styled from 'styled-components';

import Router from 'next/router';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { toggleCheckboxFilter } from '~/client/store/';
import { Button } from '~/client/components/Toolkit';

const Wrapper = styled.div`
  margin: 1rem;
`;

type Props = {
  removeWineFamilies: Function,
  wineFamilies: Array<any>
};

class WineFamiliesFilterChips extends React.Component<Props> {
  unselectWineFamily = wineFamily => () => {
    const { id } = wineFamily;
    const { removeWineFamilies } = this.props;
    const name = 'wineFamilies';
    const value = id.toString();

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
    const url = `/search?${queryString.stringify(parsed)}`;
    Router.push(url, url, { shallow: true });

    removeWineFamilies(id);
  };

  render() {
    const { wineFamilies } = this.props;
    return (
      <Wrapper>
        {wineFamilies.map(wineFamily => (
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

export default connect(
  ({ search, wineFamilies }) => ({
    wineFamilies: search.wineFamilies.map(id => wineFamilies.map[id])
  }),
  dispatch => ({
    removeWineFamilies(id) {
      dispatch(toggleCheckboxFilter('wineFamilies', id));
    }
  })
)(WineFamiliesFilterChips);
