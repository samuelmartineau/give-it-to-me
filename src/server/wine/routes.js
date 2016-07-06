import path from 'path'

import * as serverConstants from '../../common/constants/server'
import {addWine, updateWine} from './services'
import {moveWineToPermanetFolder} from '../pictures/services'

export default router => {
  router.post(serverConstants.ROUTES.WINE, (req, res) => {
    return moveWineToPermanetFolder(req.body.wine.thumbnailFileName, req.body.wine.pictureFileName).then(fileUploaded => {
      let computeWineData = {
        ...req.body.wine,
        ...fileUploaded
      }
      debugger
      return addWine(computeWineData, req.body.contextualData).then(message => {
        res.status(200).json(message)
      }).catch(error => {
        res.status(500).json(error)
      })
    })
  })
  router.put(path.join(serverConstants.ROUTES.WINE, ':wineId'), (req, res) => {
    return updateWine(req.params.wineId, req.body.wineData).then(message => {
      res.status(200).json(message)
    }).catch(error => {
      res.status(500).json(error)
    })
  })
}
