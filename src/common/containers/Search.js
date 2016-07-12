import React from 'react'
import {connect} from 'react-redux'
import store from 'store'
import Infinite from 'react-infinite'
import SearchIcon from 'material-ui/svg-icons/action/search'

import WineCard from '../components/WineCard'
import EmptyResult from '../components/EmptyResult'
import FilterModal from '../components/FilterModal'
import {filterWine} from '../utils/wineSearch'
import ResizingComponent from '../components/ResizingComponent'
import {chunkify, getColumns} from '../constants/global'

const initialFilters = {
  wineFamilies: [],
  wineTypes: [],
  wineCategories: [],
  period: []
}

function getInitState () {
  return {
    filters: Object.assign(initialFilters, store.get('filters')),
    columns: getColumns()
  }
}

class Search extends ResizingComponent {
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

  updateLayout () {
    this.setState({
      columns: getColumns()
    })
  }

  render () {
    const {wines} = this.props
    const {filters, columns} = this.state
    const winesFiltered = filterWine(wines, filters)
    let chunks = chunkify(winesFiltered, columns)
    return (
      <div>
        <FilterModal
          total={winesFiltered.length}
          filters={filters}
          updateFilters={this.updateFilters}
          />
        <div style={{display: 'flex'}}>
          {chunks.length
          ? chunks.map((chunk, index) => {
            return <Infinite
              key={index}
              elementHeight={400}
              useWindowAsScrollContainer>
              {chunk.map((wine, index) => (
                <WineCard {...this.props}
                  key={index}
                  wine={wine}
                   />))}
            </Infinite>
          })
          : (
            <EmptyResult
              icon={<SearchIcon />}
              title='Aucun vin trouvé'
              message='Impossible de trouver un vin. Peut être que tu as mis trop de filtres?'
            />
          )}
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  wines: state.cellar.wines
}))(Search)
