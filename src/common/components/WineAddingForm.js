import React, {Component, PropTypes} from 'react';
import { TextField, RaisedButton, Badge, IconButton } from 'material-ui';

import * as actions from '../actions';
import UploadPicture from './UploadPicture';
import WineTypeSelectors from './WineTypeSelectors';
import BottleTypeSelectors from './BottleTypeSelectors';
import AutoComplete from './AutoComplete';
import {WINE_TYPES, WINE_CATEGORIES, DEFAULT_TYPE, DEFAULT_CATEGORY} from '../constants/WineTypes';
import * as BottleTypes from '../constants/BottleTypes';
import {WineFamilies} from '../constants/WineFamilies';
import {noTilde} from '../constants/global';
import fuzzy from 'fuzzy';

const wineFamilies = Object.keys(WineFamilies).map(id => {return {
    id: id,
    name: WineFamilies[id],
    searchKey: noTilde(WineFamilies[id].toLowerCase()).replace('-', ' ')
}});

export default class WineAddingForm extends Component {
    constructor(props) {
      super(props);

      this.state = {
        name: '',
        wineType: Object.keys(WINE_TYPES)[DEFAULT_TYPE],
        wineCategory: WINE_TYPES[Object.keys(WINE_TYPES)[DEFAULT_TYPE]].categories[DEFAULT_CATEGORY],
        bottleType: BottleTypes.DEFAULT_TYPE.toString()
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
            wineCategory: WINE_TYPES[wineType.value].categories[0]
        });
    }

    handleWineCategory(wineCategory) {
        this.setState({
            wineCategory: wineCategory.value
        });
    }

    handleBottleType(bottleType) {
        this.setState({
            bottleType: bottleType.value
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
            <BottleTypeSelectors
                onBottleTypeChange={this.handleBottleType.bind(this)}
                typeSelected={this.state.bottleType}
                />
            <AutoComplete
                displayContentItem = {(item) => <div>{item.name}</div>}
                onItemClicked = {() => {}}
                onClearButtonClicked = {() => {}}
                displaySelectedItemInField = {(item) => item.name}
                selectionMode={true}
                filter = { (searchEntry) => {
                    if (searchEntry.length > 2) {
                        const searchFormated = noTilde(searchEntry.toLowerCase())
                            .replace('-', ' ')
                            .trim()
                        return fuzzy
                                .filter(searchFormated, wineFamilies, {extract: el => el.searchKey})
                                .map(result => result.original)
                    }
                    return [];
                }}
            />
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
