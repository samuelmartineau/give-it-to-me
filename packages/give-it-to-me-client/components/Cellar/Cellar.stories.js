import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import CellarContainer from './CellarContainer';
import CellarBoxes from './CellarBoxes';
import CellarBox from './CellarBox';
import CellarBoxSelectable from './CellarBoxSelectable';
import CellarBottles from './CellarBottles';
import CellarBottlesConnected from './CellarBottlesConnected';

storiesOf('Cellar', module)
  .add('Presentation', () => (
    <CellarContainer>
      <CellarBoxes>{boxId => <CellarBox boxId={boxId} />}</CellarBoxes>
      <CellarBottles />
    </CellarContainer>
  ))
  .add('Connected', () => (
    <CellarContainer>
      <CellarBoxes>{boxId => <CellarBox boxId={boxId} />}</CellarBoxes>
      <CellarBottlesConnected />
    </CellarContainer>
  ))
  .add('Selection', () => (
    <CellarContainer>
      <CellarBoxes>
        {boxId => {
          return (
            <CellarBoxSelectable
              boxId={boxId}
              onSelect={action('on-select', boxId)}
            />
          );
        }}
      </CellarBoxes>
      <CellarBottlesConnected />
    </CellarContainer>
  ));
