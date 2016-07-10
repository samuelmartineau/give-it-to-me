import React, {Component} from 'react'
import {connect} from 'react-redux'

import WineCard from '../components/WineCard'

class Favorite extends Component {
  render () {
    const {wineDictionary, favorite} = this.props
    return (
      <div style={{
        textAlign: 'center'
      }}>
        {favorite.map((favoriteItem, index) => <WineCard {...this.props} key={index} wine={favoriteItem} />)}
      </div>
    )
  }
}

export default connect(state => ({
  favorite: state.cellar.wines.filter(wine => wine.isFavorite)
}))(Favorite)
