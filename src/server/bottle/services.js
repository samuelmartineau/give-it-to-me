import r from 'rethinkdb'

import {getConnection} from '../utils/db'
import logger from '../utils/logger'
import config from '../../../config'
import {getCellar, getWine} from '../wine/services'

export const addBottle = (bottles) => {
  const bottlesFormated = bottles.map(bottle => ({
    ...bottle,
    timestamp: new Date()
  }))
  return getConnection.then(conn => {
    return r.table(config.DB.tables.BOTTLE)
      .insert(bottlesFormated)
      .run(conn)
      .then(() => ({message: 'Bouteilles ajoutés avec succés'}))
  }).then(cursor => cursor.toArray()).catch(error => {
    logger.error('Error adding Bottles', error)
    return Promise.reject({message: 'Probleme lors de l\'insertion dans la base de données'})
  })
}

export const removeBottle = (wineId, bottleId) => {
  return getWine(wineId).then(wine => {
    console.log(wine)
    const {bottles} = wine
    const bottle = bottles.find(bottle => bottle.id === bottleId)
    const isLastBottle = bottles.length === 1

    if (bottle) {
      getConnection.then(conn => {
        return r.table(config.DB.tables.BOTTLE)
          .get(bottleId)
          .update({
            _deleted: true
          })
          .run(conn)
          .then(() => {
            if (isLastBottle) {
              // todo transation
              r.table(config.DB.tables.WINE)
              .get(wineId)
              .update({
                _deleted: true
              })
              .run(conn)
            }
          })
      })
    } else {
      logger.error('Bottle not found')
    }
  })
}

export const onBottleChange = (cb) => {
  getConnection.then(conn => {
    r.table(config.DB.tables.BOTTLE).changes().run(conn).then(cursor => {
      cursor.each((err, item) => {
        if (err) {
          logger.error('Cursor error', err)
        }
        getCellar().then(cb)
      })
    }).catch(error => {
      logger.error('Error onCellarChange', error)
    })
  })
}
