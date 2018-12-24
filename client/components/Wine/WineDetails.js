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

class WinesDetails extends React.PureComponent<Props> {
  render() {
    const { wine, wineFamily } = this.props;
    const type = WINE_TYPES[wine.wineType];
    const category = WINE_CATEGORIES[wine.wineCategory];
    return (
      <Wrapper>
        <div>
          <span>Millésime: </span>
          <span>{wine.year}</span>
        </div>
        <div>
          <span>AOC: </span>
          <span>{wineFamily.name}</span>
        </div>
        <div>
          <span>Taille: </span>
          <span>{wine.year}</span>
        </div>
        <div>
          <span>Type: </span>
          <span>{type.label}</span>
        </div>
        <div>
          <span>Categorie: </span>
          <span>{category.label}</span>
        </div>
        <div>
          <span>Quantité: </span>
          <span>{wine.bottlesCount}</span>
        </div>
        <div>
          <span>Source: </span>
          <span>{wine.source}</span>
        </div>
      </Wrapper>
    );
  }
}

export default connect((state, { wine }) => ({
  wineFamily: state.wineFamilies.map[wine.wineFamily]
}))(WinesDetails);
