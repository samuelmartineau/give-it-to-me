import knex, {Wine} from '../utils/db'
import logger from '../utils/logger'
import {CELLAR_SCHEMA} from '../../common/constants/Cellar'
import {removeItem} from '../../common/constants/global'

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
  return Wine
      .where({_deleted: 0})
      .fetchAll({withRelated: [{
        bottles: query => {
          query.where({_deleted: 0})
        }
      }]})
      .then(wines => {
        return computeCellar(wines.toJSON())
      })
      .catch((error) => {
        logger.log('error', error)
      })
}

export const addWine = (wine, contextualData) => {
  if (!wine.isInBoxes) {
    wine = {...wine, ...contextualData}
  }

  return knex.transaction(trx => {
    return trx
      .insert(wine, 'id')
      .into('wines')
      .then(ids => {
        const wineId = ids[0]
        if (wine.isInBoxes) {
          const bottles = contextualData.bottles.map(bottle => {
            return {
              ...bottle,
              ...{wine_id: wineId}
            }
          })
          return trx.batchInsert('bottles', bottles)
        }
      })
  })
  .then(() => ({message: 'Vin ajouté avec succés'}))
  .catch(error => {
    logger.error('Error adding Wine', error)
    return Promise.reject({message: 'Probleme lors de l\'ajout dans la base de données'})
  })
}

export const updateWine = (wineId, data) => {
  let updateData = data
  console.log(wineId)

  return knex('wines')
    .where({id: wineId})
    .then(wines => {
      const wine = wines[0]
      if (data.removeBottlesCount) {
        Object.assign(updateData, {
          _deleted: wine.count <= data.removeBottlesCount,
          count: wine.count - data.removeBottlesCount,
          isFavorite: wine.count <= data.removeBottlesCount
        })
        delete updateData.removeBottlesCount
      }
      return knex('wines')
        .where({id: wineId})
        .update(updateData)
    })
    .catch(error => {
      logger.error('Error getting Wine', error)
      return Promise.reject({message: 'Probleme lors de la récupération du vin'})
    })
}
