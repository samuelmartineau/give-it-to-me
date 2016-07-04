import React, {Component} from 'react'
import {connect} from 'react-redux'
import store from 'store'
import FilterIcon from 'material-ui/svg-icons/content/sort'
import RaisedButton from 'material-ui/RaisedButton'
import Chip from 'material-ui/Chip'
import {debounce} from 'lodash'

import WineCard from '../components/WineCard'
import SearchFilter from '../components/SearchFilter'
import {WINE_TYPES, WINE_CATEGORIES} from '../constants/WineTypes'
import {filterWine} from '../utils/wineSearch'

function getInitState () {
  return {
    filters: Object.assign({
      wineFamilies: [],
      wineTypes: [],
      wineCategories: [],
      period: []
    }, store.get('filters')),
    filtersPanelOpen: false
  }
}

function getPeriod (type, evt, value) {
  const {filters} = this.state
  const index = filters.period.findIndex(year => year.type === type)
  const newPeriod = [...filters.period]
  const item = {
    type: type,
    value: value,
    label: type === 'max' ? 'x < ' + value : value + ' < x'
  }
  if (index > -1 && !value) {
    newPeriod.splice(index, 1)
  } else if (index > -1) {
    newPeriod[index] = item
  } else {
    newPeriod.push(item)
  }
  this.setState({
    filters: {...filters,
      ... {
        period: newPeriod
      }
    }
  }, () => {
    store.set('filters', this.state.filters)
  })
}

class Search extends Component {
  state = getInitState()

  constructor () {
    super()
    this.handlePeriodMin = debounce(this.handlePeriodMin, 1000)
    this.handlePeriodMax = debounce(this.handlePeriodMax, 1000)
  }

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

  handlePeriodMin = getPeriod.bind(this, 'min')

  handlePeriodMax = getPeriod.bind(this, 'max')

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
          handlePeriodMin={this.handlePeriodMin}
          handlePeriodMax={this.handlePeriodMax}
          period={filters.period}
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
