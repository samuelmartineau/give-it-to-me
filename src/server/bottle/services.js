import r from 'rethinkdb'

import {getConnection} from '../utils/db'
import logger from '../utils/logger'
import config from '../../../config'

export const addBottle = (bottles) => {
  debugger
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

// export const onBottleChange = (cb) => {
//   getConnection.then(conn => {
//     r.table(config.DB.tables.BOTTLE).changes().run(conn).then(cursor => {
//       cursor.each(function(err, item) {
//         getBasket().then(cb)
//       })
//     }).catch(error => {
//       logger.error('Error onCellarChange', error)
//     })
//   })
// }
