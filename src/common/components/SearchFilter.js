import React from 'react'
import fuzzy from 'fuzzy'

import AutoComplete from './AutoComplete'
import {noTilde} from '../constants/global'
import {WineFamilies} from '../constants/WineFamilies'

const wineFamilies = Object.keys(WineFamilies).map(id => {
  return {
    id: id,
    name: WineFamilies[id],
    searchKey: noTilde(WineFamilies[id].toLowerCase()).replace(/-/g, ' ').replace(/\s+/g, '')
  }
})

const SearchFilter = ({onChange}) => {
  return (
    <div>
      <AutoComplete
        textFieldLabel='Sélectionnez les AOCs'
        displayContentItem={(item) => <div>{item.name}</div>}
        onMultipleUpdate={(item) => { }}
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
        }
} />
    </div>
  )
}

SearchFilter.propTypes = {}

export default SearchFilter
