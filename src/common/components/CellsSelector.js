import React, {Component, PropTypes} from 'react';
import Paper from 'material-ui/Paper';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentClose from 'material-ui/svg-icons/navigation/close';

import * as actions from '../actions';
import BoxSchema from './BoxSchema';
import * as cellSelectorStyle from '../styles/cellSelector';

export default class CellsSelector extends Component {

    selectBox(event, index, value) {
        const {dispatch, boxId} = this.props
        dispatch(actions.unselectBox(boxId));
        dispatch(actions.selectBox(value));
    }

    unselectBox() {
        const {dispatch, boxId} = this.props
        dispatch(actions.unselectBox(boxId));
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
            <Paper zDepth={1} style={cellSelectorStyle.cellSelector} >
                <SelectField value={boxId} onChange={this.selectBox.bind(this)}>
                    {selectableBoxes.map((id, index) => <MenuItem key={index} value={id} primaryText={id} />)}
                </SelectField>
                {
                    Object.keys(selectedCells).length > 1
                    ? <FloatingActionButton style={cellSelectorStyle.cellSelectorCloseButton} mini={true} secondary={true} onTouchTap={this.unselectBox.bind(this)}>
                        <ContentClose />
                    </FloatingActionButton>
                    : null
                }
                <BoxSchema {...this.props} />
            </Paper>
        );
    }
}

CellsSelector.propTypes = {
    boxId: PropTypes.number.isRequired,
    selectedCells: PropTypes.object.isRequired,
    selectableCells: PropTypes.object.isRequired
};
