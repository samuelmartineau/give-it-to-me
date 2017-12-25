// @flow
import React from 'react';
import { compose } from 'recompose';
import { withStyles } from 'material-ui/styles';
import CellarSchema from '../../Cellar/CellarSchema';
import { getAvailableBoxes } from '../../Cellar/utils';

const styles = () => ({});

type BoxesSelectorProps = {
  bottles: Array<any>,
  selectedBottles: Function,
  onSelect: Function
};

class BoxesSelector extends React.Component<BoxesSelectorProps> {
  render() {
    const { selectedBottles, bottles, onSelect } = this.props;
    const selectedBottlesStyled = selectedBottles.map(bottle => ({
      ...bottle,
      color: 'blue'
    }));

    const realBottlesAndSelected = bottles.concat(selectedBottlesStyled);
    const availableBoxes = getAvailableBoxes(bottles);
    return (
      <div>
        <CellarSchema
          bottles={realBottlesAndSelected}
          onSelect={onSelect}
          selectableBoxes={availableBoxes}
        />
      </div>
    );
  }
}

export default compose(withStyles(styles))(BoxesSelector);
