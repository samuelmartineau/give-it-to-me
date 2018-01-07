// @flow
import React from 'react';
import { compose } from 'recompose';
import { withStyles } from 'material-ui/styles';
import { getAvailableBoxes } from '../../Cellar/utils';
import CellarContainer from '../../Cellar/CellarContainer';
import CellarBoxes from '../../Cellar/CellarBoxes';
import CellarBox from '../../Cellar/CellarBox';
import CellarBoxSelectable from '../../Cellar/CellarBoxSelectable';
import CellarBottles from '../../Cellar/CellarBottles';

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
      <CellarContainer>
        <CellarBoxes>
          {boxId => {
            if (availableBoxes.includes(boxId)) {
              return <CellarBoxSelectable boxId={boxId} onSelect={onSelect} />;
            }
            return <CellarBox boxId={boxId} />;
          }}
        </CellarBoxes>
        <CellarBottles bottles={realBottlesAndSelected} />
      </CellarContainer>
    );
  }
}

export default compose(withStyles(styles))(BoxesSelector);
