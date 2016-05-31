import React, {Component, PropTypes} from 'react';
import fuzzy from 'fuzzy';

import { TextField} from 'material-ui';
import * as wineTypeStyle from '../../styles/wineType';
import {noTilde} from '../../constants/global';
import AutoComplete from '../AutoComplete';
import {WineFamilies} from '../../constants/WineFamilies';

const wineFamilies = Object.keys(WineFamilies).map(id => {return {
    id: id,
    name: WineFamilies[id],
    searchKey: noTilde(WineFamilies[id].toLowerCase()).replace(/-/g, ' ')
}});

const FieldsStep = ({name, onNameChange, onWineFamilyChange, defaultWineFamily}) => {
    return (
        <div>
            <TextField
              value={name}
              floatingLabelText="Nom"
              onChange={onNameChange}
            />
            <AutoComplete
                debounced = {true}
                defaultItem = {defaultWineFamily}
                displayContentItem = {(item) => <div>{item.name}</div>}
                onItemClicked = {onWineFamilyChange}
                onClearButtonClicked = {onWineFamilyChange}
                displaySelectedItemInField = {(item) => item.name}
                selectionMode={true}
                filter = { (searchEntry) => {
                    if (searchEntry.length > 2) {
                        const searchFormated = noTilde(searchEntry.toLowerCase())
                            .replace(/-/g, ' ')
                            .trim()
                        return fuzzy
                                .filter(searchFormated, wineFamilies, {extract: el => el.searchKey})
                                .map(result => result.original)
                    }
                    return [];
                }}
            />
            <div style={{marginBottom: '100px'}}/>
        </div>
    );
};

export default FieldsStep;
