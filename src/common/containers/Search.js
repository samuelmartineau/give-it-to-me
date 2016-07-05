import React, {Component} from 'react'
import {connect} from 'react-redux'
import store from 'store'

import WineCard from '../components/WineCard'
import FilterModal from '../components/FilterModal'
import {filterWine} from '../utils/wineSearch'

function getInitState () {
  return {
    filters: Object.assign({
      wineFamilies: [],
      wineTypes: [],
      wineCategories: [],
      period: []
    }, store.get('filters'))
  }
}

class Search extends Component {
  state = getInitState()

  updateFilters = (newFilters) => {
    const {filters} = this.state
    this.setState({filters: {
      ...filters,
      ...newFilters
    }}, () => {
      store.set('filters', this.state.filters)
    })
  }

  render () {
    const {wines, basketWineDictionary} = this.props
    const {filters} = this.state
    const winesFiltered = filterWine(wines, filters)
    return (
      <div>
        <FilterModal
          filters={filters}
          updateFilters={this.updateFilters}
          />
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
