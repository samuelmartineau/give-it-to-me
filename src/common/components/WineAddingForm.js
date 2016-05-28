import React, {Component, PropTypes} from 'react';
import { TextField, RaisedButton, Badge, IconButton } from 'material-ui';

import * as actions from '../actions';
import UploadPicture from './UploadPicture';
import WineTypeSelectors from './WineTypeSelectors';
import {WINE_TYPES, WINE_CATEGORIES} from '../constants/WineTypes';

export default class WineAddingForm extends Component {
    constructor(props) {
      super(props);

      this.state = {
        name: '',
        wineType: Object.keys(WINE_TYPES)[0],
        wineCategory: WINE_TYPES[Object.keys(WINE_TYPES)[0]].types[0]
      };
    }

    handleAddWine() {
        const { dispatch, selectedCells } = this.props;
        const wineBottles = Object.keys(selectedCells).reduce((bottles, boxId) => {
            const cellsList = selectedCells[boxId];
            cellsList.forEach(cellId => {
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
        this.setState({
            name: ''
        });
    }

    handleWineType(wineType) {
        this.setState({
            wineType: wineType.value,
            wineCategory: WINE_TYPES[wineType.value].types[0]
        });
    }

    handleWineCategory(wineCategory) {
        this.setState({
            wineCategory: wineCategory.value
        });
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
              value={this.state.name}
              floatingLabelText="Nom"
              onChange={::this.handleNameChange}
            />
            <WineTypeSelectors
                onWineTypeChange={this.handleWineType.bind(this)}
                onWineCategoryChange={this.handleWineCategory.bind(this)}
                typeSelected={this.state.wineType}
                categorySelected={this.state.wineCategory}/>
            <UploadPicture {...this.props} />
            <RaisedButton
              label="Ajouter"
              onClick={this.handleAddWine.bind(this)}
              primary={true}
            />
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
