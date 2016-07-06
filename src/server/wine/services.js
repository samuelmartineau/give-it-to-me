import r from 'rethinkdb'

import {getConnection} from '../utils/db'
import logger from '../utils/logger'
import {CELLAR_SCHEMA} from '../../common/constants/Cellar'
import {removeItem} from '../../common/constants/global'
import config from '../../../config'
import {addBottle} from '../bottle/services'

export const computeCellar = (wines) => {
  let boxId = 0
  let availableCells = {}
  let selectedCells = {}
  let bottlesByBoxes = {}
  let selectableCells

  CELLAR_SCHEMA.forEach(box => {
    availableCells[boxId] = Array(box.schema.reduce((x, y) => x * y, 1)).fill().map((_, cellId) => cellId)
    boxId++
  })

  wines.forEach(wine => {
    if (wine.isInBoxes) {
      wine.bottles.forEach(bottle => {
        const availableCellsInBox = removeItem(availableCells[bottle.box], availableCells[bottle.box].indexOf(bottle.cell))

        if (!bottlesByBoxes[bottle.box]) {
          bottlesByBoxes[bottle.box] = []
        }
        bottlesByBoxes[bottle.box].push({cell: bottle.cell, wineType: wine.wineType})

        if (availableCellsInBox.length) {
          availableCells[bottle.box] = availableCellsInBox
        } else {
          let {
            [bottle.box.toString()]: omit, // eslint-disable-line no-unused-vars
            ...res
          } = availableCells
          availableCells = res
        }
      })
    }
  })

  selectableCells = {
    ...availableCells
  }
  const selectableBoxes = Object.keys({
    ...availableCells
  })
  selectedCells[selectableBoxes[0]] = [availableCells[selectableBoxes[0]].slice(0, 1)[0]]

  if (availableCells[selectableBoxes[0]].length === 1) {
    let {
      [boxId]: omit, // eslint-disable-line no-unused-vars
      ...res
    } = selectableCells
    selectableCells = res
  } else {
    selectableCells[selectableBoxes[0]] = removeItem(availableCells[selectableBoxes[0]], 0)
  }

  return {wines, availableCells, bottlesByBoxes, selectableCells, selectedCells}
}

export const getCellar = () => {
  return getConnection.then(conn => {
    return r.table(config.DB.tables.WINE).merge((wine) => {
      console.log(wine)
      return {
        'bottles': r.table(config.DB.tables.BOTTLE).getAll(wine.id, {index: 'wine_id'}).coerce_to('array')
      }
    })
      // .eqJoin('id', r.table(config.DB.tables.BOTTLE), {index: 'wine_id', multi: true})
      // .zip()
      .run(conn)
  }).then(cursor => cursor.toArray()).then(wines => {
    debugger
    return computeCellar(wines)
  }).catch(error => {
    logger.error('Error getting Cellar', error)
    return Promise.reject({message: 'Probleme lors de la récupération des vins dans la base de données'})
  })
}

export const addWine = (wine, contextualData) => {
  if (!wine.isInBoxes) {
    wine = {...wine, ...contextualData}
  }

  return getConnection.then(conn => {
    return r.table(config.DB.tables.WINE)
      .insert({
        ...wine,
        timestamp: new Date()
      })
      .run(conn)
      .then(result => {
        if (wine.isInBoxes) {
          const bottles = contextualData.bottles.map(bottle => ({
            ...bottle,
            ...{wine_id: result.generated_keys[0]}
          }))
          return addBottle(bottles)
        }
      })
      .then(() => ({message: 'Vin ajouté avec succés'}))
  }).catch(error => {
    logger.error('Error adding Wine', error)
    return Promise.reject({message: 'Probleme lors de l\'ajout dans la base de données'})
  })
}

export const updateWine = (wineId, wineData) => {
  return getConnection.then(conn => {
    return r.table(config.DB.tables.WINE)
        .get(wineId)
        .run(conn)
  }).catch(error => {
    logger.error('Error getting Wine', error)
    return Promise.reject({message: 'Probleme lors de la récupération du vin'})
  })

  // todo remove bottle on wine
  // remove wine if no bottle
  // remove ref if wine in basket
}

export const onCellarChange = (cb) => {
  getConnection.then(conn => {
    r.table(config.DB.tables.WINE).changes().run(conn).then(cursor => {
      cursor.each(function (err, item) {
        if (err) {
          logger.error('Error onCellarChange', err)
        }
        getCellar().then(cb)
      })
    }).catch(error => {
      logger.error('Error onCellarChange', error)
    })
  })
}
