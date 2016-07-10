import logger from '../utils/logger'
import {updateWine} from '../wine/services'

export const addToFavorite = (wineId) => {
  return updateWine(wineId, {
    isFavorite: true
  })
  .then(() => ({message: 'Vin ajouté avec succés aux favoris'}))
  .catch(error => {
    logger.error('Error adding Wine to favorite', error)
    return Promise.reject({message: 'Probleme lors de l\'ajout du vin aux favoris dans la base de données'})
  })
}

export const removeFromFavorite = (wineId) => {
  return updateWine(wineId, {
    isFavorite: false
  })
  .then(() => ({message: 'Vin supprimé avec succés des favoris'}))
  .catch(error => {
    logger.error('Error removing Wine from favorite', error)
    return Promise.reject({message: 'Probleme lors de la suppréssion du vin des favoris dans la base de données'})
  })
}
