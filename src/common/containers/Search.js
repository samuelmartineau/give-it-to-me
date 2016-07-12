import React from 'react'
import {connect} from 'react-redux'
import store from 'store'
import Infinite from 'react-infinite'

import WineCard from '../components/WineCard'
import FilterModal from '../components/FilterModal'
import {filterWine} from '../utils/wineSearch'
import ResizingComponent from '../components/ResizingComponent'

function chunkify (a, n, balanced) {
  if (n < 2) {
    return [a]
  }

  var len = a.length
  var out = []
  var i = 0
  var size

  if (len % n === 0) {
    size = Math.floor(len / n)
    while (i < len) {
      out.push(a.slice(i, i += size))
    }
  } else if (balanced) {
    while (i < len) {
      size = Math.ceil((len - i) / n--)
      out.push(a.slice(i, i += size))
    }
  } else {
    n--
    size = Math.floor(len / n)
    if (len % size === 0) {
      size--
    }
    while (i < size * n) {
      out.push(a.slice(i, i += size))
    }
    out.push(a.slice(size * n))
  }
  return out
}

function getColumns() {
  let columns
  if (window.innerWidth >= 1300) {
    columns = 3
  } else if (window.innerWidth < 700) {
    columns = 1
  } else {
    columns = 2
  }
  return columns
}

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
          {chunks.map((chunk, index) => {
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
          })}
        </div>
      </div>
    )
  }
}

export default connect(state => ({
  wines: state.cellar.wines
}))(Search)
