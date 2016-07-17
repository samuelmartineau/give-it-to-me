import path from 'path'

import * as serverConstants from '../../common/constants/server'
import {addWine, updateWine} from './services'
import {moveWineToPermanetFolder} from '../pictures/services'
import {updateClients} from '../handleChanges'

export default router => {
  router.post(serverConstants.ROUTES.WINE, (req, res, next) => {
    return moveWineToPermanetFolder(req.body.wine.thumbnailFileName, req.body.wine.pictureFileName)
      .then(fileUploaded => {
        let computeWineData = {
          ...req.body.wine,
          ...fileUploaded
        }
        return addWine(computeWineData, req.body.contextualData)
      })
      .then(message => {
        updateClients()
        res.status(200).json(message)
      })
      .catch(error => {
        res.status(500).json(error)
      })
  })
  router.put(path.join(serverConstants.ROUTES.WINE, ':wineId'), (req, res) => {
    const {wineId} = req.params
    let {data} = req.body

    return updateWine(wineId, data)
      .then(() => {
        updateClients()
        res.status(200).json({
          message: 'Bouteille(s) supprimé avec succés'
        })
      }).catch(error => {
        res.status(500).json(error)
      })
  })
}
