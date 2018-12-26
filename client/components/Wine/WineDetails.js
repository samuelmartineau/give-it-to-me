// @flow
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import config from '~/config';

const { WINE_TYPES, WINE_CATEGORIES } = config.wineTypes;

type Props = {
  wine: {},
  wineFamily: {}
};

const Wrapper = styled.div``;
const Text = styled.div`
  font-size: 20px;
  color: ${({ wine }) => (wine.wineType !== 'RED' ? '#373737' : '#eee')};
`;
const Highlight = styled.span`
  font-weight: bold;
  font-size: 25px;
  font-style: italic;
  color: ${({ wine }) => (wine.wineType !== 'RED' ? 'black' : 'white')};
`;

class WinesDetails extends React.PureComponent<Props> {
  render() {
    const { wine, wineFamily } = this.props;
    const type = WINE_TYPES[wine.wineType];
    const category = WINE_CATEGORIES[wine.wineCategory];
    return (
      <Wrapper>
        <Text wine={wine}>
          Il reste{' '}
          <Highlight wine={wine}>
            {wine.bottlesCount} bouteille{wine.bottlesCount > 1 && 's'}
          </Highlight>{' '}
          de{' '}
          <Highlight wine={wine}>
            {type.label} {category.label}
          </Highlight>{' '}
          de <Highlight wine={wine}>{wine.year}</Highlight> avec une appelation{' '}
          <Highlight wine={wine}>{wineFamily.name.toLowerCase()}</Highlight>
        </Text>
      </Wrapper>
    );
  }
}

export default connect((state, { wine }) => ({
  wineFamily: state.wineFamilies.map[wine.wineFamily]
}))(WinesDetails);
