import React, {Component} from 'react'
import {connect} from 'react-redux'

class Basket extends Component {
  render () {
    const {wineDictionary, basket} = this.props
    return (
      <div style={{
        textAlign: 'center'
      }}>
        {basket.map((basketItem, index) => <WineCard {...this.props} key={index} wine={wineDictionary[basketItem.wineId]} basketWine={basketItem}/>)}
      </div>
    )
  }
}

function mapStateToProps (state) {
  const wineDictionary = state.cellar.wines.reduce((acc, wine) => {
    acc[wine.id] = wine
    return acc
  }, {})

  return {wineDictionary: wineDictionary, basket: state.basket}
}
export default connect(mapStateToProps)(Basket)
