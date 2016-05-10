import React, {Component, PropTypes} from 'react';
import { TextField, RaisedButton, Badge, IconButton } from 'material-ui';

import * as actions from '../actions';
import UploadPicture from '../components/UploadPicture';

export default class WineAddingForm extends Component {
    handleAddWine() {
        const { dispatch, selectedCells } = this.props;
        const wineBottles = Object.keys(selectedCells).reduce((bottles, boxId) => {
            const cellList = selectedCells[boxId];
            cellList.forEach(cellId => {
                bottles.push({
                    box: boxId,
                    cell: cellId
                })
            });
            return bottles;
        }, []);
        const wine = {
            name: this.state.name,
            bottles: wineBottles
         };
        dispatch(actions.createWine(wine));
    }

    handleNameChange(event) {
        this.setState({
            name: event.target.value
        });
    }

  render() {
      return (
          <div>
            <TextField
              floatingLabelText="Nom"
              onChange={::this.handleNameChange}
            />
            <RaisedButton
              label="Ajouter"
              onClick={this.handleAddWine.bind(this)}
              primary={true}
            />
            <UploadPicture {...this.props} />
          </div>
      );
  }
}

WineAddingForm.propTypes = {
    wines: PropTypes.array.isRequired,
    selectedCells: PropTypes.object.isRequired,
    selectableCells: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
}
