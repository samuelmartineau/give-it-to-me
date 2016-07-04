import React from 'react'
import fuzzy from 'fuzzy'

import TextField from 'material-ui/TextField'
import {noTilde} from '../../constants/global'
import AutoComplete from '../AutoComplete'
import {WineFamilies} from '../../constants/WineFamilies'

const wineFamilies = Object.keys(WineFamilies).map(id => {
  return {
    id: id,
    name: WineFamilies[id],
    searchKey: noTilde(WineFamilies[id].toLowerCase()).replace(/-/g, ' ').replace(/\s+/g, '')
  }
})

const FieldsStep = ({
  name,
  year,
  onNameChange,
  onWineFamilyChange,
  onYearChange,
  defaultWineFamily
}) => {
  return (
    <div>
      <TextField value={name} floatingLabelText='Nom' onChange={onNameChange} /><br />
      <TextField type={'number'} value={year} floatingLabelText='Année' onChange={onYearChange} /><br />
      <AutoComplete
        textFieldLabel="Sélectionnez l'AOC"
        defaultItem={defaultWineFamily}
        displayContentItem={(item) => <div>{item.name}</div>}
        onItemClicked={onWineFamilyChange}
        onClearButtonClicked={onWineFamilyChange}
        displaySelectedItemInField={(item) => item.name}
        selectionMode
        filter={(searchEntry) => {
          if (searchEntry.length > 2) {
            const searchFormated = noTilde(searchEntry.toLowerCase()).replace(/-/g, ' ').replace(/\s+/g, '')
            return fuzzy.filter(searchFormated, wineFamilies, {
              extract: el => el.searchKey
            }).slice(0, 5).map(result => result.original)
          }
          return []
        }} />
      <div style={{
        marginBottom: '100px'
      }} />
    </div>
  )
}

export default FieldsStep
