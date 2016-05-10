import React, {Component, PropTypes} from 'react';
import { Paper } from 'material-ui';

import * as paperStyle from '../styles/paper';

export default class CellsSelector extends Component {

    selectBox() {
        debugger
    }

    render() {
        const {selectedCells, selectableCells} = this.props;

        return (
            <Paper zDepth={1} style={paperStyle.paper}>
                <p>{this.props.boxId}</p>
                {this.props.selectedCells.map((cell, index) => <span key={index}>{cell}</span>)}
            </Paper>
        );
    }
}

CellsSelector.propTypes = {
    boxId: PropTypes.number.isRequired,
    selectedCells: PropTypes.array.isRequired,
    selectableCells: PropTypes.object.isRequired
};
