// @flow
import React from 'react';
import CellarContainer from '~/client/components/Cellar/CellarContainer';
import CellarBoxes from '~/client/components/Cellar/CellarBoxes';
import CellarBottles from '~/client/components/Cellar/CellarBottles';
import ClickHandlerBox from './ClickHandlerBox';

type BoxesSelectorProps = {};

class BoxesSelector extends React.Component<BoxesSelectorProps> {
  render() {
    return (
      <CellarContainer>
        <CellarBoxes>
          {boxId => <ClickHandlerBox key={boxId} boxId={boxId} />}
        </CellarBoxes>
        <CellarBottles />
      </CellarContainer>
    );
  }
}

export default BoxesSelector;
