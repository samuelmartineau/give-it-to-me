import React from 'react'
import fuzzy from 'fuzzy'
import Checkbox from 'material-ui/Checkbox'

import AutoComplete from './AutoComplete'
import {noTilde} from '../constants/global'
import {WineFamilies} from '../constants/WineFamilies'
import {WINE_TYPES, WINE_CATEGORIES} from '../constants/WineTypes'

const wineFamilies = Object.keys(WineFamilies).map(id => {
  return {
    id: id,
    name: WineFamilies[id],
    searchKey: noTilde(WineFamilies[id].toLowerCase()).replace(/-/g, ' ').replace(/\s+/g, '')
  }
})

const SearchFilter = ({handleWineFamilies, selectedWineFamilies, wineTypes, handleWineTypes, wineCategories, handleWineCategories}) => {
  return (
    <div style={{padding: '8px', background: 'rgba(22, 214, 76, 0.2)'}}>
      <h1>AOCs</h1>
      <AutoComplete
        defaultSelectedItems={selectedWineFamilies}
        textFieldLabel='Sélectionnez les AOCs'
        displayContentItem={(item) => <div>{item.name}</div>}
        onMultipleUpdate={handleWineFamilies}
        displaySelectedItemInField={(item) => item.name}
        filter={(searchEntry) => {
          if (searchEntry.length > 2) {
            const searchFormated = noTilde(searchEntry.toLowerCase())
              .replace(/-/g, ' ')
              .replace(/\s+/g, '')
            return fuzzy
              .filter(searchFormated, wineFamilies, {
                extract: el => el.searchKey
              })
              .slice(0, 5)
              .map(result => result.original)
          }
          return []
        }}
      />
      <h1>Couleurs</h1>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap'
      }}>
        {Object.keys(WINE_TYPES).map((type, index) => <Checkbox
          key={index}
          label={WINE_TYPES[type].label}
          checked={wineTypes.indexOf(type) > -1}
          style={{display: 'inline-block', flex: 1}}
          value={type}
          onCheck={handleWineTypes}
        />)}
      </div>
      <h1>Texture</h1>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap'
      }}>
        {Object.keys(WINE_CATEGORIES).map((category, index) => <Checkbox
          key={index}
          label={WINE_CATEGORIES[category].label}
          checked={wineCategories.indexOf(category) > -1}
          style={{display: 'inline-block', flex: 1, minWidth: '200px'}}
          value={category}
          onCheck={handleWineCategories}
        />)}
      </div>
      <h1>Période</h1>
      <div></div>
    </div>
  )
}

SearchFilter.propTypes = {}

export default SearchFilter
