import React, {Component} from 'react'
import {connect} from 'react-redux'

import WineCard from '../components/WineCard'

class Basket extends Component {
  render () {
    const {wineDictionary, favorite} = this.props
    return (
      <div style={{
        textAlign: 'center'
      }}>
        {favorite.map((basketItem, index) => <WineCard {...this.props} key={index} wine={wineDictionary[basketItem.wineId]} basketWine={basketItem} />)}
      </div>
    )
  }
}

function mapStateToProps (state) {
  const wineDictionary = state.cellar.wines.reduce((acc, wine) => {
    acc[wine.id] = wine
    return acc
  }, {})

  return {wineDictionary: wineDictionary, favorite: state.favorite}
}
export default connect(mapStateToProps)(Basket)
