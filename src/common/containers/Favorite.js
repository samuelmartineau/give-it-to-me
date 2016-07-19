import React, {Component} from 'react'
import {connect} from 'react-redux'
import FavoriteIcon from 'material-ui/svg-icons/action/favorite-border'

import WineCard from '../components/WineCard'
import EmptyResult from '../components/EmptyResult'

class Favorite extends Component {
  render () {
    const {favorite} = this.props
    return (
      <div style={{
        textAlign: 'center'
      }}>
        {favorite.length
        ? favorite.map((favoriteItem, index) => <WineCard {...this.props} key={index} wine={favoriteItem} />)
        : (
          <EmptyResult
            icon={<FavoriteIcon />}
            title='Aucun favori pour le moment'
            message='Pour ajouter des favoris il te suffit de faire une recherche et de cliquer sur le petit coeur dans la carte'
          />
        )
        }
      </div>
    )
  }
}

export default connect(state => ({
  favorite: state.cellar.wines.filter(wine => wine.isFavorite)
}))(Favorite)
