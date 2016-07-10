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
    const {wines} = this.props
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
          {winesFiltered.map((wine, index) => (
            <WineCard {...this.props}
              key={index}
              wine={wine}
               />))}
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  wines: state.cellar.wines
}))(Search)
