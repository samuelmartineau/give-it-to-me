import React from 'react';

import { PictureStep } from './PictureStep';
import { MetaStep } from './MetaStep';
import { PositionStep } from './PositionStep';
import { TypesStep } from './TypesStep';
import { Button } from '~/client/components/Toolkit';

export class AddSteps extends React.Component {
  onSubmit = () => {
    console.log('good');
  };
  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <PictureStep />
        <MetaStep />
        <TypesStep />
        <PositionStep />
        <Button type="submit">Envoyer</Button>
      </form>
    );
  }
}
