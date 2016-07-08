import * as serverConstants from '../../common/constants/server'
import {addWine} from './services'
import {moveWineToPermanetFolder} from '../pictures/services'

export default router => {
  router.post(serverConstants.ROUTES.WINE, (req, res) => {
    return moveWineToPermanetFolder(req.body.wine.thumbnailFileName, req.body.wine.pictureFileName).then(fileUploaded => {
      let computeWineData = {
        ...req.body.wine,
        ...fileUploaded
      }
      return addWine(computeWineData, req.body.contextualData).then(message => {
        res.status(200).json(message)
      }).catch(error => {
        res.status(500).json(error)
      })
    })
  })
}
