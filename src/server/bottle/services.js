import r from 'rethinkdb'

import {getConnection} from '../utils/db'
import logger from '../utils/logger'
import config from '../../../config'
import {getWine, updateWine} from '../wine/services'

export const addBottle = (bottles) => {
  const bottlesFormated = bottles.map(bottle => ({
    ...bottle,
    timestamp: new Date()
  }))
  return getConnection.then(conn => {
    return r.table(config.DB.tables.BOTTLE.name)
      .insert(bottlesFormated)
      .run(conn)
      .then(() => ({message: 'Bouteilles ajoutés avec succés'}))
  }).catch(error => {
    logger.error('Error adding Bottles', error)
    return Promise.reject({message: 'Probleme lors de l\'insertion dans la base de données'})
  })
}

export const removeBottle = (wineId, bottleId) => {
  return getWine(wineId).then(wine => {
    const {bottles} = wine
    const bottle = bottles.find(bottle => bottle.id === bottleId)
    const isLastBottle = bottles.length === 1

    if (bottle) {
      return getConnection.then(conn => {
        return r.table(config.DB.tables.BOTTLE.name)
          .get(bottleId)
          .update({
            _deleted: true
          })
          .run(conn)
          .then(() => {
            let promises = []
            if (isLastBottle) {
              promises.push(updateWine(wineId, {
                _deleted: true,
                isFavorite: false
              }))
            }
            return Promise.all(promises)
              .then(() => ({message: 'Bouteille supprimée avec succés'}))
          })
      })
    } else {
      logger.error('Bottle not found')
    }
  })
}
