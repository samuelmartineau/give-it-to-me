import r from 'rethinkdb'

import {getConnection} from '../utils/db'
import logger from '../utils/logger'
import config from '../../../config'

export const getFavorite = () => {
  return getConnection.then(conn => {
    return r.table(config.DB.tables.FAVORITE).run(conn)
  }).then(cursor => cursor.toArray()).catch(error => {
    logger.error('Error getting Favorite', error)
    return Promise.reject({message: 'Probleme lors de la récupération des favoris dans la base de données'})
  })
}

export const addToFavorite = (wineId) => {
  return getConnection.then(conn => {
    return r.table(config.DB.tables.FAVORITE).insert({wineId: wineId, timestamp: new Date()}).run(conn).then(() => ({message: 'Vin ajouté aux favoris avec succés'}))
  }).catch(error => {
    logger.error('Error adding Wine to favortie', error)
    return Promise.reject({message: 'Probleme lors de l\'ajout du vin aux favoris dans la base de données'})
  })
}

export const removeFromFavorite = (favoriteId) => {
  return getConnection.then(conn => {
    return r.table(config.DB.tables.FAVORITE).get(favoriteId).delete().run(conn).then(() => ({message: 'Vin supprimé aux favoris avec succés'}))
  }).catch(error => {
    logger.error('Error removing Wine from favorite', error)
    return Promise.reject({message: 'Probleme lors de la suppréssion du vin des favoris dans la base de données'})
  })
}

export const onFavoriteChange = (cb) => {
  getConnection.then(conn => {
    r.table(config.DB.tables.FAVORITE).changes().run(conn).then(cursor => {
      cursor.each((err, item) => {
        if (err) {
          logger.error('Cursor error', err)
        }
        getFavorite().then(cb)
      })
    }).catch(error => {
      logger.error('Error onCellarChange', error)
    })
  })
}
