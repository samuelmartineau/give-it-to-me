import React, {Component} from 'react'
import {connect} from 'react-redux'
import store from 'store'

import WineCard from '../components/WineCard'
import SearchFilter from '../components/SearchFilter'

function filterWine (wines, filters) {
  return wines.filter(wine => {
    let isValid = true
    if (filters.wineFamilies.length) {
      isValid = filters.wineFamilies.some(wineFamily => {
        return wineFamily.id === wine.wineFamily
      })
    }
    if (filters.wineTypes.length) {
      isValid = filters.wineTypes.some(wineType => {
        return wineType === wine.wineType
      })
    }
    return isValid
  })
}

function getInitState () {
  return {
    filters: Object.assign({
      wineFamilies: [],
      wineTypes: []
    }, store.get('filters'))
  }
}

class Search extends Component {
  state = getInitState()

  componentDidMount () {
    this.setState(getInitState())
  }

  handleWineFamilies = (wineFamilies) => {
    this.setState({filters: {
      wineFamilies: wineFamilies
    }}, () => {
      store.set('filters', this.state.filters)
    })
  }

  handleWineTypes = (evt, value) => {
    const wineType = evt.target.value
    const {filters} = this.state
    const wineTypes = [...filters.wineTypes]
    const index = wineTypes.indexOf(wineType)
    if (value) {
      wineTypes.push(wineType)
    } else if (index > -1) {
      wineTypes.splice(index, 1)
    }
    this.setState({filters: {...filters, ...{
      wineTypes: wineTypes
    }}}, () => {
      store.set('filters', this.state.filters)
    })
  }

  render () {
    const {wines, basketWineDictionary} = this.props
    const {filters} = this.state
    const winesFiltered = filterWine(wines, filters)
    return (
      <div>
        <SearchFilter
          selectedWineFamilies={filters.wineFamilies}
          handleWineFamilies={this.handleWineFamilies}
          wineTypes={filters.wineTypes}
          handleWineTypes={this.handleWineTypes}
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
