import React, {Component, PropTypes} from 'react';
import { Paper } from 'material-ui';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import * as paperStyle from '../styles/paper';
import * as actions from '../actions';

export default class CellsSelector extends Component {

    selectBox(event, index, value) {
        const {dispatch, boxId} = this.props
        dispatch(actions.unselectBox(boxId));
        dispatch(actions.selectBox(value));
    }

    render() {
        const {selectedCells, selectableCells, boxId} = this.props;
        const currentSelectedCells = selectedCells[boxId];
        const selectableBoxes = Object.keys(selectableCells)
                                    .filter(boxId => Object.keys(selectedCells).indexOf(boxId) === -1)
                                    .map(boxId => parseInt(boxId))
                                    .concat([boxId])
                                    .sort((a, b) => a - b);

        return (
            <Paper zDepth={1}>
                <SelectField value={boxId} onChange={this.selectBox.bind(this)}>
                    {selectableBoxes.map((id, index) => <MenuItem key={index} value={id} primaryText={id} />)}
                </SelectField>
                <p>{this.props.boxId}</p>
                {currentSelectedCells.map((cell, index) => <span key={index}>{cell}</span>)}
            </Paper>
        );
    }
}

CellsSelector.propTypes = {
    boxId: PropTypes.number.isRequired,
    selectedCells: PropTypes.object.isRequired,
    selectableCells: PropTypes.object.isRequired
};
