import React, {Component} from 'react'
import {connect} from 'react-redux'
import store from 'store'
import FilterIcon from 'material-ui/svg-icons/content/sort'
import RaisedButton from 'material-ui/RaisedButton'
import Chip from 'material-ui/Chip'

import WineCard from '../components/WineCard'
import SearchFilter from '../components/SearchFilter'
import {WINE_TYPES, WINE_CATEGORIES} from '../constants/WineTypes'

function filterWine (wines, filters) {
  return wines.filter(wine => {
    const wineFamilyIsSet = filters.wineFamilies.length
    const wineFamilyMatched = filters.wineFamilies.some(wineFamily => {
      return wineFamily.id === wine.wineFamily
    })
    const wineTypeIsSet = filters.wineTypes.length
    const wineTypeMatched = filters.wineTypes.some(wineType => {
      return wineType.key === wine.wineType
    })
    const wineCategoryIsSet = filters.wineCategories.length
    const wineCategoryMatched = filters.wineCategories.some(wineCategory => {
      return wineCategory.key === wine.wineCategory
    })

    if (wineFamilyIsSet && !wineFamilyMatched) {
      return false
    }

    if (wineTypeIsSet && !wineTypeMatched) {
      return false
    }

    if (wineCategoryIsSet && !wineCategoryMatched) {
      return false
    }

    return true
  })
}

function getInitState () {
  return {
    filters: Object.assign({
      wineFamilies: [],
      wineTypes: [],
      wineCategories: []
    }, store.get('filters')),
    filtersPanelOpen: false
  }
}

class Search extends Component {
  state = getInitState()

  toggleFiltersPanel = () => {
    const {filtersPanelOpen} = this.state
    this.setState({filtersPanelOpen: !filtersPanelOpen})
  }

  handleWineFamilies = (wineFamilies) => {
    const {filters} = this.state
    this.setState({filters: { ...filters, ...{
      wineFamilies: wineFamilies.map(wineFamily => ({
        ...wineFamily,
        ...{label: wineFamily.name}
      }))
    }}}, () => {
      store.set('filters', this.state.filters)
    })
  }

  handleWineTypes = (evt, value) => {
    const wineType = evt.target.value
    const {filters} = this.state
    const wineTypes = [...filters.wineTypes]
    const index = wineTypes.map(wineType => wineType.key).indexOf(wineType)
    if (value) {
      wineTypes.push({
        ...WINE_TYPES[wineType],
        ...{key: wineType}
      })
    } else if (index > -1) {
      wineTypes.splice(index, 1)
    }
    this.setState({filters: {...filters, ...{
      wineTypes: wineTypes
    }}}, () => {
      store.set('filters', this.state.filters)
    })
  }

  handleWineCategories = (evt, value) => {
    const wineCategory = evt.target.value
    const {filters} = this.state
    const wineCategories = [...filters.wineCategories]
    const index = wineCategories.map(wineCategory => wineCategory.key).indexOf(wineCategory)
    if (value) {
      wineCategories.push({
        ...WINE_CATEGORIES[wineCategory],
        ...{key: wineCategory}
      })
    } else if (index > -1) {
      wineCategories.splice(index, 1)
    }
    this.setState({filters: {...filters, ...{
      wineCategories: wineCategories
    }}}, () => {
      store.set('filters', this.state.filters)
    })
  }

  render () {
    const {wines, basketWineDictionary} = this.props
    const {filters, filtersPanelOpen} = this.state
    const winesFiltered = filterWine(wines, filters)
    return (
      <div>
        <RaisedButton
          label='Filtres'
          secondary={filtersPanelOpen}
          onTouchTap={this.toggleFiltersPanel}
          icon={<FilterIcon />}
        />
      {Object.keys(filters).map(itemKey => filters[itemKey].map((item, index) => <Chip style={{display: 'inline-block'}} key={index}>{item.label}</Chip>))}
        {filtersPanelOpen && <SearchFilter
          selectedWineFamilies={filters.wineFamilies}
          handleWineFamilies={this.handleWineFamilies}
          wineTypes={filters.wineTypes.map(wineType => wineType.key)}
          handleWineTypes={this.handleWineTypes}
          wineCategories={filters.wineCategories.map(wineCategory => wineCategory.key)}
          handleWineCategories={this.handleWineCategories}
        />}
        <div style={{
          textAlign: 'center'
        }}>
          {winesFiltered.map((wine, index) => <WineCard {...this.props} key={index} wine={wine} basketWine={basketWineDictionary[wine.id]} />)}
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  const basketWineDictionary = state.basket.reduce((acc, basketWine) => {
    acc[basketWine.wineId] = basketWine
    return acc
  }, {})

  return {wines: state.cellar.wines, basketWineDictionary: basketWineDictionary}
}
export default connect(mapStateToProps)(Search)
