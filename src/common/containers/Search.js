import React, {Component} from 'react'
import {connect} from 'react-redux'
import store from 'store'
import Infinite from 'react-infinite'

import WineCard from '../components/WineCard'
import FilterModal from '../components/FilterModal'
import {filterWine} from '../utils/wineSearch'

const initialFilters = {
  wineFamilies: [],
  wineTypes: [],
  wineCategories: [],
  period: []
}

function getInitState () {
  return {
    filters: Object.assign(initialFilters, store.get('filters'))
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
          total={winesFiltered.length}
          filters={filters}
          updateFilters={this.updateFilters}
          />
        <Infinite
          style={{
            textAlign: 'center'
          }}
          elementHeight={140}
          useWindowAsScrollContainer>
          {winesFiltered.map((wine, index) => (
            <WineCard {...this.props}
              key={index}
              wine={wine}
               />))}
        </Infinite>
      </div>
    )
  }
}

export default connect(state => ({
  wines: state.cellar.wines
}))(Search)
