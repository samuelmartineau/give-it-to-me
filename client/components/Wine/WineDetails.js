// @flow
import React from 'react';
import styled from 'styled-components';

type Props = {
  wine: {}
};

const Wrapper = styled.div``;

class WinesDetails extends React.PureComponent<Props> {
  render() {
    const { wine } = this.props;
    return (
      <Wrapper>
        <div>
          <span>Millésime: </span>
          <span>{wine.year}</span>
        </div>
        <div>
          <span>AOC: </span>
          <span>{wine.year}</span>
        </div>
        <div>
          <span>Taille: </span>
          <span>{wine.year}</span>
        </div>
        <div>
          <span>Type: </span>
          <span>{wine.wineType}</span>
        </div>
        <div>
          <span>Source: </span>
          <span>{wine.source}</span>
        </div>
      </Wrapper>
    );
  }
}

export default WinesDetails;
