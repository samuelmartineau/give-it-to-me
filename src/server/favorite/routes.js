import * as serverConstants from '../../common/constants/server'
import {addToFavorite, removeFromFavorite} from './services'

export default router => {
  router.post(serverConstants.ROUTES.FAVORITE, (req, res) => {
    return addToFavorite(req.body.wineId).then(message => {
      res.status(200).json(message)
    }).catch(error => {
      res.status(500).json(error)
    })
  })

  router.delete(serverConstants.ROUTES.FAVORITE, (req, res) => {
    return removeFromFavorite(req.body.favoriteId).then(message => {
      res.status(200).json(message)
    }).catch(error => {
      res.status(500).json(error)
    })
  })
}
