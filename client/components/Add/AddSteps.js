import React from 'react';

import { PictureStep } from './PictureStep';
import { MetaStep } from './MetaStep';
import { PositionStep } from './PositionStep';
import { TypesStep } from './TypesStep';
import { Button } from '~/client/components/Toolkit';
import { Form } from 'react-form';

export class AddSteps extends React.Component {
  onSubmit = submittedValues => {
    console.log('good', submittedValues);
  };
  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        {formApi => (
          <form onSubmit={formApi.submitForm}>
            <PictureStep />
            <MetaStep />
            <TypesStep />
            <PositionStep />
            <Button type="submit">Envoyer</Button>
          </form>
        )}
      </Form>
    );
  }
}
