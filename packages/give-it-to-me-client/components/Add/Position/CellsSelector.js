import React from 'react';
import { withStyles } from 'material-ui/styles';
import CellarSchema from '../../Cellar/CellarSchema';
import { getAvailableBoxes } from '../../Cellar/utils';
import BoxSchema from '../../Cellar/BoxSchema';

const styles = () => ({
  boxes: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gridGap: '10px'
  },
  box: {}
});

const CellsSelector = ({ classes }) => (
  <div className={classes.boxes}>
    {[2, 12, 25].map(boxeId => (
      <BoxSchema
        className={classes.box}
        key={boxeId}
        boxId={boxeId}
        bottles={[
          {
            id: 1,
            box: 23,
            cell: 6
          }
        ]}
        onSelect={console.log}
        selectableCells={[0, 1, 2, 3]}
      />
    ))}
  </div>
);

export default withStyles(styles)(CellsSelector);
